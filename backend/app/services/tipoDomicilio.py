from sqlalchemy.orm import Session
from app.models import TipoDomicilio
from app.schemas import tipoDomicilio as schemas

def get_tipos_domicilio(db: Session, skip: int = 0, limit: int = 100):
    return db.query(TipoDomicilio).offset(skip).limit(limit).all()

def get_tipo_domicilio(db: Session, id_tipo_domicilio: int):
    return db.query(TipoDomicilio).filter(TipoDomicilio.idtipoDomicilio == id_tipo_domicilio).first()

def create_tipo_domicilio(db: Session, tipo_domicilio: schemas.TipoDomicilioCreate):
    db_tipo = TipoDomicilio(**tipo_domicilio.dict())
    db.add(db_tipo)
    db.commit()
    db.refresh(db_tipo)
    return db_tipo

def update_tipo_domicilio(db: Session, id_tipo_domicilio: int, tipo_domicilio: schemas.TipoDomicilioUpdate):
    db_tipo = db.query(TipoDomicilio).filter(TipoDomicilio.idtipoDomicilio == id_tipo_domicilio).first()
    if not db_tipo:
        return None
    for key, value in tipo_domicilio.dict().items():
        setattr(db_tipo, key, value)
    db.commit()
    db.refresh(db_tipo)
    return db_tipo
