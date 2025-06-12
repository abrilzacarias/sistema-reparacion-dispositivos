from sqlalchemy.orm import Session
from app.models import Contacto
from app.schemas import contacto as schemas

def get_contactos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Contacto).offset(skip).limit(limit).all()

def get_contacto(db: Session, id_contacto: int):
    return db.query(Contacto).filter(Contacto.idContacto == id_contacto).first()

def create_contacto(db: Session, contacto: schemas.ContactoCreate):
    db_contacto = Contacto(**contacto.dict())
    db.add(db_contacto)
    db.commit()
    db.refresh(db_contacto)
    return db_contacto

def update_contacto(db: Session, contacto: schemas.ContactoUpdate):
    db_contacto = db.query(Contacto).filter(Contacto.idContacto == contacto.idContacto).first()
    if not db_contacto:
        return None

    update_data = contacto.dict(exclude_unset=True)

    update_data.pop("idPersona", None)

    for key, value in update_data.items():
        setattr(db_contacto, key, value)

    db.commit()
    db.refresh(db_contacto)
    return db_contacto

def obtener_telefono_de_persona_o_contactos(persona):
    telefonos = [
        c for c in persona.contactos
        if c.tipoContacto and c.tipoContacto.descripcionTipoContacto.lower() == "teléfono" and c.descripcionContacto
    ]
    for c in telefonos:
        if c.esPrimario:
            return c.descripcionContacto
    return telefonos[0].descripcionContacto if telefonos else None

