from sqlalchemy.orm import Session
from app.models.reparacion import Reparacion
from app.models.empleado import Empleado 
from app.schemas.reparacion import ReparacionCreate, ReparacionUpdate
from sqlalchemy.orm import selectinload
from app.models.registroEstadoReparacion import RegistroEstadoReparacion
from app.models import DetalleReparacion
from fastapi import HTTPException


def get_reparacion(db: Session, id: int):
    return db.query(Reparacion)\
        .options(
            selectinload(Reparacion.empleado).selectinload(Empleado.persona),
            selectinload(Reparacion.diagnostico),
            selectinload(Reparacion.registroEstadoReparacion).selectinload(RegistroEstadoReparacion.estadoReparacion)
        )\
        .filter(Reparacion.idReparacion == id).first()


def get_reparaciones(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Reparacion)\
        .options(
            #selectinload(Reparacion.estadoReparacion),
            selectinload(Reparacion.empleado),
            selectinload(Reparacion.diagnostico),
            selectinload(Reparacion.registroEstadoReparacion)
        )


def create_reparacion(db: Session, reparacion: ReparacionCreate):
    db_reparacion = Reparacion(**reparacion.dict())
    db.add(db_reparacion)
    db.commit()
    db.refresh(db_reparacion)
    return db_reparacion


def update_reparacion(db: Session, id: int, reparacion: ReparacionUpdate):
    db_reparacion = get_reparacion(db, id)
    if not db_reparacion:
        return None
    for key, value in reparacion.dict().items():
        setattr(db_reparacion, key, value)
    db.commit()
    db.refresh(db_reparacion)
    return db_reparacion


def delete_reparacion(db: Session, id: int):
    db_reparacion = get_reparacion(db, id)
    if not db_reparacion:
        return None

    # Verificar si hay detalles asociados a la reparación
    detalles = db.query(DetalleReparacion).filter_by(idReparacion=id).first()
    if detalles:
        raise HTTPException(
            status_code=400,
            detail="No se puede eliminar la reparación porque tiene detalles asociados."
        )

    db.delete(db_reparacion)
    db.commit()
    return db_reparacion



