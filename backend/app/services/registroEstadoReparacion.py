from sqlalchemy.orm import Session
from app.models.registroEstadoReparacion import RegistroEstadoReparacion
from app.schemas import registroEstadoReparacion as schemas

def get_registros(db: Session):
    return db.query(RegistroEstadoReparacion)

def get_registro(db: Session, id_registro: int):
    return db.query(RegistroEstadoReparacion).filter(RegistroEstadoReparacion.idRegistroEstadoReparacion == id_registro).first()

def create_registro(db: Session, registro: schemas.RegistroEstadoReparacionCreate):
    db_registro = RegistroEstadoReparacion(**registro.dict())
    db.add(db_registro)
    db.commit()
    db.refresh(db_registro)
    return db_registro

def update_registro(db: Session, id_registro: int, registro: schemas.RegistroEstadoReparacionUpdate):
    db_registro = get_registro(db, id_registro)
    if not db_registro:
        return None
    for key, value in registro.dict().items():
        setattr(db_registro, key, value)
    db.commit()
    db.refresh(db_registro)
    return db_registro

def delete_registro(db: Session, id_registro: int):
    registro = db.query(RegistroEstadoReparacion).filter(
        RegistroEstadoReparacion.idRegistroEstadoReparacion == id_registro
    ).first()
    if registro:
        db.delete(registro)
        db.commit()
        return True
    return False

def get_estado_actual(db: Session, id_reparacion: int):
    return (
        db.query(RegistroEstadoReparacion)
        .filter(RegistroEstadoReparacion.idReparacion == id_reparacion)
        .order_by(RegistroEstadoReparacion.fechaHoraRegistroEstadoReparacion.desc())
        .first()
    )