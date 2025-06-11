from sqlalchemy.orm import Session
from app.models.tipoReparacion import TipoReparacion
from app.schemas.tipoReparacion import TipoReparacionCreate, TipoReparacionUpdate

def get_tipo_reparacion(db: Session, id: int):
    return db.query(TipoReparacion).filter(TipoReparacion.idTipoReparacion == id).first()

def get_tipos_reparacion(db: Session, skip: int = 0, limit: int = 100):
    return db.query(TipoReparacion).offset(skip).limit(limit).all()

def create_tipo_reparacion(db: Session, tipo_reparacion: TipoReparacionCreate):
    db_tipo = TipoReparacion(descripcionTipoReparacion=tipo_reparacion.descripcionTipoReparacion)
    db.add(db_tipo)
    db.commit()
    db.refresh(db_tipo)
    return db_tipo

def update_tipo_reparacion(db: Session, id: int, tipo_reparacion: TipoReparacionUpdate):
    db_tipo = get_tipo_reparacion(db, id)
    if not db_tipo:
        return None
    db_tipo.descripcionTipoReparacion = tipo_reparacion.descripcionTipoReparacion
    db.commit()
    db.refresh(db_tipo)
    return db_tipo

def delete_tipo_reparacion(db: Session, id: int):
    db_tipo = get_tipo_reparacion(db, id)
    if not db_tipo:
        return None
    db.delete(db_tipo)
    db.commit()
    return db_tipo
