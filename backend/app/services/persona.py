from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from app.models.persona import Persona
from app.models.contacto import Contacto
from app.schemas.persona import PersonaCreate, PersonaUpdate

def get_persona(db: Session, idPersona: int):
    return db.query(Persona).filter(Persona.idPersona == idPersona).first()

def get_personas(db: Session, search: str = None):
    query = db.query(Persona)
    if search:
        search = f"%{search.lower()}%"
        query = query.filter(
            or_(
                func.lower(Persona.nombre).like(search),
                func.lower(Persona.apellido).like(search),
                func.lower(Persona.cuit).like(search)
            )
        )
    return query

def create_persona(db: Session, persona_data: PersonaCreate):
    data = persona_data.dict()
    contactos_data = data.pop("contactos", [])

    db_persona = Persona(**data)
    db.add(db_persona)
    db.commit()
    db.refresh(db_persona)

    for contacto in contactos_data:
        db_contacto = Contacto(**contacto, idPersona=db_persona.idPersona)
        db.add(db_contacto)
    db.commit()
    return db_persona

def update_persona(db: Session, idPersona: int, persona: PersonaUpdate):
    db_persona = get_persona(db, idPersona)
    if not db_persona:
        return None
    for key, value in persona.dict().items():
        setattr(db_persona, key, value)
    db.commit()
    db.refresh(db_persona)
    return db_persona


def delete_persona(db: Session, id_persona: int) -> bool:
    persona = db.query(Persona).filter(Persona.idPersona == id_persona).first()
    if persona is None:
        return False
    persona.estadoPersona = 0
    db.commit()
    return True
