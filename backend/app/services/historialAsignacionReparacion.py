from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from app.models.historialAsignacionReparacion import HistorialAsignacionReparacion
from app.schemas.historialAsignacionReparacion import (
    HistorialAsignacionReparacionCreate,
    HistorialAsignacionReparacionUpdate
)
from app.schemas import historialAsignacionReparacion as schemas


def get_historiales(db: Session, search: str = None):
    query = db.query(HistorialAsignacionReparacion).join(HistorialAsignacionReparacion.empleado)
    if search:
        search = f"%{search.lower()}%"
        query = query.filter(
            or_(
                func.lower(func.concat(HistorialAsignacionReparacion.empleado.persona.nombre, ' ', HistorialAsignacionReparacion.empleado.persona.apellido)).like(search)
            )
        )
    return query

def get_historial(db: Session, idHistorial: int):
    return db.query(HistorialAsignacionReparacion).filter(
        HistorialAsignacionReparacion.idHistorialAsignacionReparacion == idHistorial
    ).first()

def create_historial(db: Session, historial: HistorialAsignacionReparacionCreate):
    db_historial = HistorialAsignacionReparacion(**historial.dict())
    db.add(db_historial)
    db.commit()
    db.refresh(db_historial)
    return db_historial

def update_historial(db: Session, idHistorial: int, historial: HistorialAsignacionReparacionUpdate):
    db_historial = get_historial(db, idHistorial)
    if db_historial is None:
        return None
    for field, value in historial.dict(exclude_unset=True).items():
        setattr(db_historial, field, value)
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

def get_historial_asignaciones_por_reparacion(db: Session, id_reparacion: int):
    return db.query(HistorialAsignacionReparacion)\
        .filter(HistorialAsignacionReparacion.idReparacion == id_reparacion)\
        .order_by(HistorialAsignacionReparacion.fechaInicioAsignacionReparacion.desc())
