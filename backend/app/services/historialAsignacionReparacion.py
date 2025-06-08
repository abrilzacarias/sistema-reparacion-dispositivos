from sqlalchemy.orm import Session
from app.models.historialAsignacionReparacion import HistorialAsignacionReparacion
from app.schemas import historialAsignacionReparacion as schemas

def get_historiales(db: Session, skip: int = 0, limit: int = 100):
    return db.query(HistorialAsignacionReparacion).offset(skip).limit(limit)

def get_historial(db: Session, id_historial: int):
    return db.query(HistorialAsignacionReparacion).filter(
        HistorialAsignacionReparacion.idHistorialAsignacionReparacion == id_historial
    ).first()

def create_historial(db: Session, historial: schemas.HistorialAsignacionReparacionCreate):
    db_historial = HistorialAsignacionReparacion(**historial.dict())
    db.add(db_historial)
    db.commit()
    db.refresh(db_historial)
    return db_historial

def update_historial(db: Session, id_historial: int, historial: schemas.HistorialAsignacionReparacionUpdate):
    db_historial = get_historial(db, id_historial)
    if not db_historial:
        return None
    for key, value in historial.dict().items():
        setattr(db_historial, key, value)
    db.commit()
    db.refresh(db_historial)
    return db_historial

def delete_historial(db: Session, id_historial: int):
    historial = get_historial(db, id_historial)
    if historial:
        db.delete(historial)
        db.commit()
        return True
    return False
