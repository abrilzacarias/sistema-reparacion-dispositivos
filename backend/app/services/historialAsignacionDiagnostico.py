from sqlalchemy.orm import Session
from app.models.historialAsignacionDiagnostico import HistorialAsignacionDiagnostico
from app.schemas import historialAsignacionDiagnostico as schemas

def get_historiales(db: Session, skip: int = 0, limit: int = 100):
    return db.query(HistorialAsignacionDiagnostico).offset(skip).limit(limit)

def get_historial(db: Session, id_historial: int):
    return db.query(HistorialAsignacionDiagnostico).filter(HistorialAsignacionDiagnostico.idHistorialAsignacionDiagnostico == id_historial).first()

def create_historial(db: Session, historial: schemas.HistorialAsignacionDiagnosticoCreate):
    db_historial = HistorialAsignacionDiagnostico(**historial.dict())
    db.add(db_historial)
    db.commit()
    db.refresh(db_historial)
    return db_historial

def update_historial(db: Session, id_historial: int, historial: schemas.HistorialAsignacionDiagnosticoUpdate):
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

def get_historial_asignaciones_por_diagnostivo(db: Session, id_diagnostico: int):
    return db.query(HistorialAsignacionDiagnostico)\
        .filter(HistorialAsignacionDiagnostico.idDiagnostico == id_diagnostico)\
        .order_by(HistorialAsignacionDiagnostico.fechaInicioAsignacionDiagnostico.desc())