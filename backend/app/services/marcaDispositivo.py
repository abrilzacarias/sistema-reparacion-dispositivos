from sqlalchemy.orm import Session, selectinload
from app import models
from app.schemas import marcaDispositivo as schemas

def get_marca_dispositivos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.MarcaDispositivo).filter(
        models.MarcaDispositivo.estadoMarcaDispositivo == True
    ).offset(skip).limit(limit).all()


def get_marca_dispositivo(db: Session, id_marca: int):
    return db.query(models.MarcaDispositivo).filter(
        models.MarcaDispositivo.idMarcaDispositivo == id_marca
    ).options(
        selectinload(models.MarcaDispositivo.repuestos)
    ).first()

def create_marca_dispositivo(db: Session, marca: schemas.MarcaDispositivoCreate):
    db_marca = models.MarcaDispositivo(**marca.dict())
    db.add(db_marca)
    db.commit()
    db.refresh(db_marca)
    print("Marca creada:", db_marca.descripcionMarcaDispositivo)
    return db_marca

def update_marca_dispositivo(db: Session, id_marca: int, marca_update: schemas.MarcaDispositivoUpdate):
    db_marca = get_marca_dispositivo(db, id_marca)
    if not db_marca:
        return None
    for key, value in marca_update.dict().items():
        setattr(db_marca, key, value)
    db.commit()
    db.refresh(db_marca)
    return db_marca

def delete_marca_dispositivo(db: Session, id_marca: int):
    db_marca = get_marca_dispositivo(db, id_marca)
    if not db_marca:
        return None

    # Verificamos si tiene repuestos activos asociados
    if any(repuesto.estadoRepuesto for repuesto in db_marca.repuestos):
        raise ValueError("No se puede eliminar la marca porque tiene repuestos activos asociados.")

    # Eliminación lógica
    db_marca.estadoMarcaDispositivo = False
    db.commit()
    db.refresh(db_marca)
    return db_marca

