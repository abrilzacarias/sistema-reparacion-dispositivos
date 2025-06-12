from sqlalchemy.orm import Session
from app.models.tipoDispositivo import TipoDispositivo
from app.schemas.tipoDispositivo import TipoDispositivoCreate

def get_all(db: Session):
    return db.query(TipoDispositivo)

def get_by_id(db: Session, id: int):
    return db.query(TipoDispositivo).filter(TipoDispositivo.idTipoDispositivo == id).first()

def create(db: Session, tipo_dispositivo: TipoDispositivoCreate):
    db_tipo = TipoDispositivo(**tipo_dispositivo.dict())
    db.add(db_tipo)
    db.commit()
    db.refresh(db_tipo)
    return db_tipo

def delete(db: Session, id: int):
    db_tipo = get_by_id(db, id)
    if db_tipo:
        db.delete(db_tipo)
        db.commit()
        return True
    return False
