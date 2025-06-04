from sqlalchemy.orm import Session
from app.models import TipoContacto
from app.schemas import tipoContacto as schemas

def get_tipos_contacto(db: Session, skip: int = 0, limit: int = 100):
    return db.query(TipoContacto).offset(skip).limit(limit).all()

def get_tipo_contacto(db: Session, id_tipo: int):
    return db.query(TipoContacto).filter(TipoContacto.idtipoContacto == id_tipo).first()

def create_tipo_contacto(db: Session, tipo: schemas.TipoContactoCreate):
    db_tipo = TipoContacto(**tipo.dict())
    db.add(db_tipo)
    db.commit()
    db.refresh(db_tipo)
    return db_tipo

def update_tipo_contacto(db: Session, id_tipo: int, tipo: schemas.TipoContactoUpdate):
    db_tipo = get_tipo_contacto(db, id_tipo)
    if not db_tipo:
        return None
    for key, value in tipo.dict().items():
        setattr(db_tipo, key, value)
    db.commit()
    db.refresh(db_tipo)
    return db_tipo
