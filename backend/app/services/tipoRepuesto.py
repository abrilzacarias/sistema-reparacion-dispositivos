# app/services/tipoRepuesto.py
from sqlalchemy.orm import Session
from app.models import tipoRepuesto as models
from app.schemas import tipoRepuesto as schemas
from app.models import Repuesto 
from fastapi import HTTPException

def get_tipos_repuesto(db: Session):
    return db.query(models.TipoRepuesto).all()

def get_tipo_repuesto(db: Session, idTipoRepuesto: int):
    return db.query(models.TipoRepuesto).filter(
        models.TipoRepuesto.idTipoRepuesto == idTipoRepuesto
    ).first()

def create_tipo_repuesto(db: Session, tipo_repuesto: schemas.TipoRepuestoCreate):
    db_tipo = models.TipoRepuesto(**tipo_repuesto.dict())
    db.add(db_tipo)
    db.commit()
    db.refresh(db_tipo)
    return db_tipo

def update_tipo_repuesto(db: Session, idTipoRepuesto: int, tipo_repuesto: schemas.TipoRepuestoUpdate):
    db_tipo = get_tipo_repuesto(db, idTipoRepuesto)
    if not db_tipo:
        return None
    for key, value in tipo_repuesto.dict().items():
        setattr(db_tipo, key, value)
    db.commit()
    db.refresh(db_tipo)
    return db_tipo


def delete_tipo_repuesto(db: Session, idTipoRepuesto: int):
    db_tipo = get_tipo_repuesto(db, idTipoRepuesto)
    if not db_tipo:
        return None

    # Verificamos si hay algún repuesto que use este tipo de repuesto
    repuesto_en_uso = db.query(Repuesto).filter(Repuesto.idTipoRepuesto == idTipoRepuesto).first()
    if repuesto_en_uso:
        raise HTTPException(
            status_code=400,
            detail="No se puede eliminar: este tipo de repuesto está en uso por al menos un repuesto."
        )

    db.delete(db_tipo)
    db.commit()
    return db_tipo
