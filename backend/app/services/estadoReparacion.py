from sqlalchemy.orm import Session
from app.models.estadoReparacion import EstadoReparacion
from app.schemas.estadoReparacion import EstadoReparacionCreate, EstadoReparacionUpdate

def get_all_estado_reparacion(db: Session):
    return db.query(EstadoReparacion)

def get_estado_reparacion(db: Session, id_estado: int):
    return db.query(EstadoReparacion).filter(EstadoReparacion.idEstadoReparacion == id_estado).first()

def create_estado_reparacion(db: Session, estado: EstadoReparacionCreate):
    db_estado = EstadoReparacion(**estado.dict())
    db.add(db_estado)
    db.commit()
    db.refresh(db_estado)
    return db_estado

def update_estado_reparacion(db: Session, id_estado: int, estado: EstadoReparacionUpdate):
    db_estado = get_estado_reparacion(db, id_estado)
    if not db_estado:
        return None
    for key, value in estado.dict().items():
        setattr(db_estado, key, value)
    db.commit()
    db.refresh(db_estado)
    return db_estado

def delete_estado_reparacion(db: Session, id_estado: int):
    db_estado = get_estado_reparacion(db, id_estado)
    if not db_estado:
        return None
    db.delete(db_estado)
    db.commit()
    return db_estado
