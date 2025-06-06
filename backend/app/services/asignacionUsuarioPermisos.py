from sqlalchemy.orm import Session
from app.models.asignacionUsuarioPermisos import AsignacionUsuarioPermisos
from app.schemas import asignacionUsuarioPermisos as schemas

def get_asignaciones(db: Session):
    return db.query(AsignacionUsuarioPermisos)

def get_asignacion(db: Session, id_asignacion: int):
    return db.query(AsignacionUsuarioPermisos).filter(AsignacionUsuarioPermisos.idasignacionUsuarioPermisos == id_asignacion).first()

def create_asignacion(db: Session, asignacion: schemas.AsignacionUsuarioPermisosCreate):
    db_asignacion = AsignacionUsuarioPermisos(**asignacion.dict())
    db.add(db_asignacion)
    db.commit()
    db.refresh(db_asignacion)
    return db_asignacion

def update_asignacion(db: Session, id_asignacion: int, asignacion: schemas.AsignacionUsuarioPermisosUpdate):
    db_asignacion = get_asignacion(db, id_asignacion)
    if not db_asignacion:
        return None
    for key, value in asignacion.dict().items():
        setattr(db_asignacion, key, value)
    db.commit()
    db.refresh(db_asignacion)
    return db_asignacion

def delete_asignacion(db: Session, id_asignacion: int):
    asignacion = db.query(AsignacionUsuarioPermisos).filter(
        AsignacionUsuarioPermisos.idasignacionUsuarioPermisos == id_asignacion
    ).first()
    
    if asignacion:
        asignacion.estadoAsignacionUsuarioPermisos = 0  # Borrado lógico
        db.commit()
        return True
    return False