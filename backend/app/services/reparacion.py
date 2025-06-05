from sqlalchemy.orm import Session
from app.models.reparacion import Reparacion
from app.models.empleado import Empleado 
from app.schemas.reparacion import ReparacionCreate, ReparacionUpdate
from sqlalchemy.orm import selectinload

def get_reparacion(db: Session, id: int):
    return db.query(Reparacion)\
        .options(
            selectinload(Reparacion.estadoReparacion),
            selectinload(Reparacion.empleado).selectinload(Empleado.persona) ,
            selectinload(Reparacion.diagnostico)
        )\
        .filter(Reparacion.idReparacion == id).first()

def get_reparaciones(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Reparacion)\
        .options(
            selectinload(Reparacion.estadoReparacion),
            selectinload(Reparacion.empleado),
            selectinload(Reparacion.diagnostico)
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
    db.delete(db_reparacion)
    db.commit()
    return db_reparacion
