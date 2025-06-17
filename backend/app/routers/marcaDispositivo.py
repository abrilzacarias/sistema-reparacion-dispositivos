from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi import HTTPException
from app.schemas import marcaDispositivo as schemas
from app.services import marcaDispositivo as services
from app.database import get_db
from app import models

router = APIRouter(prefix="/marcas", tags=["Marcas de Dispositivos"])

# Obtener todas las marcas (sin repuestos para evitar sobrecarga)
@router.get("/", response_model=Page[schemas.MarcaDispositivoOut], summary="Obtener todas las marcas")
def read_marcas(db: Session = Depends(get_db)):
    return paginate(services.get_marca_dispositivos(db))

# Obtener marca específica CON sus repuestos
@router.get("/{idMarcaDispositivo}", response_model=schemas.MarcaDispositivoWithRepuestos, summary="Obtener una marca por ID con sus repuestos")
def read_marca(idMarcaDispositivo: int, db: Session = Depends(get_db)):
    marca = services.get_marca_dispositivo(db, idMarcaDispositivo)
    if not marca:
        raise HTTPException(status_code=404, detail="Marca no encontrada")
    return marca

@router.post("/", response_model=schemas.MarcaDispositivoOut, status_code=status.HTTP_201_CREATED, summary="Crear una nueva marca")
def create_marca(marca: schemas.MarcaDispositivoCreate, db: Session = Depends(get_db)):
    try:
        return services.create_marca_dispositivo(db, marca)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{idMarcaDispositivo}", response_model=schemas.MarcaDispositivoOut, summary="Actualizar una marca")
def update_marca(idMarcaDispositivo: int, marca: schemas.MarcaDispositivoUpdate, db: Session = Depends(get_db)):
    db_marca = services.update_marca_dispositivo(db, idMarcaDispositivo, marca)
    if not db_marca:
        raise HTTPException(status_code=404, detail="Marca no encontrada")
    return db_marca

@router.delete("/{idMarcaDispositivo}", summary="Eliminar una marca")
def delete_marca(idMarcaDispositivo: int, db: Session = Depends(get_db)):
    try:
        marca = services.delete_marca_dispositivo(db, idMarcaDispositivo)
        if not marca:
            raise HTTPException(status_code=404, detail="Marca no encontrada")
        return {"mensaje": "Marca eliminada correctamente"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
"""
@router.get("/por-tipo/{id_tipo}", response_model=List[schemas.MarcaDispositivoOut])
def get_marcas_por_tipo(id_tipo: int, db: Session = Depends(get_db)):
    Devuelve todas las marcas que tienen modelos asociados a dispositivos del tipo dado.
    
    marcas = (
        db.query(models.MarcaDispositivo)
        .join(models.ModeloDispositivo, models.MarcaDispositivo.idMarcaDispositivo == models.ModeloDispositivo.idMarcaDispositivo)
        .join(models.Dispositivo, models.ModeloDispositivo.idModeloDispositivo == models.Dispositivo.idModeloDispositivo)
        .filter(models.Dispositivo.idTipoDispositivo == id_tipo)
        .filter(models.Dispositivo.estadoDispositivo == 1)  # Opcional: solo activos
        .filter(models.ModeloDispositivo.estadoModeloDispositivo == 1)  # Opcional
        .distinct()
        .all()
    )
    return marcas
"""
@router.get("/marcas-por-tipo/{id_tipo}")
def get_marcas_por_tipo(id_tipo: int, db: Session = Depends(get_db)):
    marcas_raw = db.query(
        models.MarcaDispositivo.idMarcaDispositivo,
        models.MarcaDispositivo.descripcionMarcaDispositivo
    ).join(
        models.ModeloDispositivo,
        models.MarcaDispositivo.idMarcaDispositivo == models.ModeloDispositivo.idMarcaDispositivo
    ).filter(
        models.ModeloDispositivo.idTipoDispositivo == id_tipo
    ).distinct().all()

    marcas = [
        {"idMarcaDispositivo": m[0], "descripcionMarcaDispositivo": m[1]}
        for m in marcas_raw
    ]

    return marcas
