from sqlalchemy.orm import Session
from typing import List
from app.models.detalleReparacion import DetalleReparacion
from app.schemas.detalleReparacion import DetalleReparacionCreate, DetalleReparacionUpdate

def get_all(db: Session) -> List[DetalleReparacion]:
    return db.query(DetalleReparacion).all()

def get_by_id(db: Session, detalle_id: int) -> DetalleReparacion | None:
    return db.query(DetalleReparacion).filter(DetalleReparacion.idDetalleReparacion == detalle_id).first()

def create(db: Session, detalle: DetalleReparacionCreate) -> DetalleReparacion:
    db_detalle = DetalleReparacion(**detalle.dict())
    db.add(db_detalle)
    db.commit()
    db.refresh(db_detalle)
    return db_detalle

def update(db: Session, detalle_id: int, detalle_update: DetalleReparacionUpdate) -> DetalleReparacion | None:
    db_detalle = get_by_id(db, detalle_id)
    if not db_detalle:
        return None
    update_data = detalle_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_detalle, key, value)
    db.commit()
    db.refresh(db_detalle)
    return db_detalle

def delete(db: Session, detalle_id: int) -> bool:
    db_detalle = get_by_id(db, detalle_id)
    if not db_detalle:
        return False
    db.delete(db_detalle)
    db.commit()
    return True
