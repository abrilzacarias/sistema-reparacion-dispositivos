from sqlalchemy.orm import Session, selectinload
from sqlalchemy import func
from app import models
from app.schemas import marcaDispositivo as schemas

def get_marca_dispositivos(db: Session):
    return db.query(models.MarcaDispositivo).filter(
        models.MarcaDispositivo.estadoMarcaDispositivo == True
    )


def get_marca_dispositivo(db: Session, id_marca: int):
    return db.query(models.MarcaDispositivo).filter(
        models.MarcaDispositivo.idMarcaDispositivo == id_marca
    ).options(
        selectinload(models.MarcaDispositivo.repuestos)
    ).first()

def create_marca_dispositivo(db: Session, marca: schemas.MarcaDispositivoCreate):
    existing_marca = db.query(models.MarcaDispositivo).filter(
        func.lower(models.MarcaDispositivo.descripcionMarcaDispositivo) == marca.descripcionMarcaDispositivo.lower(),
        models.MarcaDispositivo.estadoMarcaDispositivo == True
    ).first()
    
    if existing_marca:
        raise ValueError(f"Ya existe una marca activa con esta descripción: {existing_marca.descripcionMarcaDispositivo}")
    
    db_marca = models.MarcaDispositivo(
        descripcionMarcaDispositivo=marca.descripcionMarcaDispositivo,  # Guardar exactamente como ingresó el usuario
        estadoMarcaDispositivo=True
    )
    db.add(db_marca)
    db.commit()
    db.refresh(db_marca)
    print("Marca creada:", db_marca.descripcionMarcaDispositivo)
    return db_marca

def update_marca_dispositivo(db: Session, id_marca: int, marca_update: schemas.MarcaDispositivoUpdate):
    db_marca = get_marca_dispositivo(db, id_marca)
    if not db_marca:
        return None
    
    if marca_update.descripcionMarcaDispositivo:
        existing_marca = db.query(models.MarcaDispositivo).filter(
            func.lower(models.MarcaDispositivo.descripcionMarcaDispositivo) == marca_update.descripcionMarcaDispositivo.lower(),
            models.MarcaDispositivo.estadoMarcaDispositivo == True,
            models.MarcaDispositivo.idMarcaDispositivo != id_marca
        ).first()
        
        if existing_marca:
            raise ValueError(f"Ya existe una marca activa con esta descripción: {existing_marca.descripcionMarcaDispositivo}")
    
    if marca_update.descripcionMarcaDispositivo:
        db_marca.descripcionMarcaDispositivo = marca_update.descripcionMarcaDispositivo
    
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

