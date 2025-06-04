from sqlalchemy.orm import Session
from app.models import puestoLaboral as models
from app.schemas import puestoLaboral as schemas

def get_all_puestos(db: Session):
    return db.query(models.PuestoLaboral)

def get_puesto(db: Session, idpuestoLaboral: int):
    return db.query(models.PuestoLaboral).filter(models.PuestoLaboral.idpuestoLaboral == idpuestoLaboral).first()

def create_puesto(db: Session, puesto: schemas.PuestoLaboralCreate):
    db_puesto = models.PuestoLaboral(**puesto.dict())
    db.add(db_puesto)
    db.commit()
    db.refresh(db_puesto)
    return db_puesto

def update_puesto(db: Session, idpuestoLaboral: int, puesto: schemas.PuestoLaboralUpdate):
    db_puesto = get_puesto(db, idpuestoLaboral)
    if not db_puesto:
        return None
    for key, value in puesto.dict().items():
        setattr(db_puesto, key, value)
    db.commit()
    db.refresh(db_puesto)
    return db_puesto

def delete_puesto(db: Session, idpuestoLaboral: int):
    db_puesto = get_puesto(db, idpuestoLaboral)
    if not db_puesto:
        return False
    db.delete(db_puesto)
    db.commit()
    return True
