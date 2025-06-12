from sqlalchemy.orm import Session, selectinload
from app.models.dispositivo import Dispositivo
from app.models.modeloDispositivo import ModeloDispositivo  # Asegurate de importarlo si usás nombres separados
from app.schemas.dispositivo import DispositivoCreate

def get_all(db: Session):
    return db.query(Dispositivo)\
        .options(
            selectinload(Dispositivo.modeloDispositivo)
                .selectinload(ModeloDispositivo.marcaDispositivo),  # ✅ accedés a la marca a través del modelo
            selectinload(Dispositivo.tipoDispositivo),
            selectinload(Dispositivo.cliente)
        )\
        .filter(Dispositivo.estadoDispositivo == True)\
        .all()


def get_by_id(db: Session, id: int):
    return db.query(Dispositivo).filter(Dispositivo.idDispositivo == id, Dispositivo.estadoDispositivo == True).first()

def create(db: Session, dispositivo: DispositivoCreate):
    db_dispositivo = Dispositivo(**dispositivo.dict())
    db.add(db_dispositivo)
    db.commit()
    db.refresh(db_dispositivo)
    return db_dispositivo

def delete(db: Session, id: int):
    db_dispositivo = db.query(Dispositivo).filter(Dispositivo.idDispositivo == id).first()
    if db_dispositivo and db_dispositivo.estadoDispositivo:
        db_dispositivo.estadoDispositivo = False
        db.commit()
        return True
    return False
