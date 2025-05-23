from sqlalchemy.orm import Session
from app.models import Domicilio
from app.schemas import domicilio as schemas

def get_domicilios(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Domicilio).offset(skip).limit(limit).all()

def get_domicilio(db: Session, id_domicilio: int):
    return db.query(Domicilio).filter(Domicilio.idDomicilio == id_domicilio).first()

def create_domicilio(db: Session, domicilio: schemas.DomicilioCreate):
    db_domicilio = Domicilio(**domicilio.dict())
    db.add(db_domicilio)
    db.commit()
    db.refresh(db_domicilio)
    return db_domicilio

def update_domicilio(db: Session, id_domicilio: int, domicilio: schemas.DomicilioUpdate):
    db_domicilio = db.query(Domicilio).filter(Domicilio.idDomicilio == id_domicilio).first()
    if not db_domicilio:
        return None
    for key, value in domicilio.dict().items():
        setattr(db_domicilio, key, value)
    db.commit()
    db.refresh(db_domicilio)
    return db_domicilio
