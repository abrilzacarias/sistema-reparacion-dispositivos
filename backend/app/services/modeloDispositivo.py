from sqlalchemy.orm import Session, selectinload
from app import models
from app.schemas import modeloDispositivo as schemas

def get_modelos_dispositivo(db: Session):
    return db.query(models.ModeloDispositivo).filter(
        models.ModeloDispositivo.estadoModeloDispositivo == True
    )

def get_modelo_dispositivo(db: Session, id_modelo: int):
    return db.query(models.ModeloDispositivo).filter(
        models.ModeloDispositivo.idModeloDispositivo == id_modelo
    ).options(
        selectinload(models.ModeloDispositivo.marcaDispositivo)
    ).first()

def create_modelo_dispositivo(db: Session, modelo: schemas.ModeloDispositivoCreate):
    data = modelo.dict()
    if "estadoModeloDispositivo" not in data or data["estadoModeloDispositivo"] is None:
        data["estadoModeloDispositivo"] = True
    db_modelo = models.ModeloDispositivo(**data)
    db.add(db_modelo)
    db.commit()
    db.refresh(db_modelo)
    return db_modelo

def update_modelo_dispositivo(db: Session, id_modelo: int, modelo_update: schemas.ModeloDispositivoUpdate):
    db_modelo = get_modelo_dispositivo(db, id_modelo)
    if not db_modelo:
        return None
    for key, value in modelo_update.dict().items():
        setattr(db_modelo, key, value)
    db.commit()
    db.refresh(db_modelo)
    return db_modelo

def delete_modelo_dispositivo(db: Session, id_modelo: int):
    db_modelo = get_modelo_dispositivo(db, id_modelo)
    if not db_modelo:
        return None

    db_modelo.estadoModeloDispositivo = False
    db.commit()
    db.refresh(db_modelo)
    return db_modelo
