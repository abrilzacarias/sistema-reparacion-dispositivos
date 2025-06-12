from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate

from app.schemas import marcaDispositivo as schemas
from app.services import marcaDispositivo as services
from app.database import get_db

router = APIRouter(prefix="/marcas", tags=["Marcas de Dispositivos"])

# Obtener todas las marcas (sin repuestos para evitar sobrecarga)

@router.get("/", response_model=List[schemas.MarcaDispositivoOut], summary="Obtener todos los modelos")
def read_modelos(db: Session = Depends(get_db)):
    modelos = services.get_marca_dispositivos(db)
    return modelos

# Obtener marca específica CON sus repuestos
@router.get("/{idMarcaDispositivo}", response_model=schemas.MarcaDispositivoWithRepuestos, summary="Obtener una marca por ID con sus repuestos")
def read_marca(idMarcaDispositivo: int, db: Session = Depends(get_db)):
    marca = services.get_marca_dispositivo(db, idMarcaDispositivo)
    if not marca:
        raise HTTPException(status_code=404, detail="Marca no encontrada")
    return marca

@router.post("/", response_model=schemas.MarcaDispositivoOut, status_code=status.HTTP_201_CREATED, summary="Crear una nueva marca")
def create_marca(marca: schemas.MarcaDispositivoCreate, db: Session = Depends(get_db)):
    print('creando en router')
    return services.create_marca_dispositivo(db, marca)

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
    
from fastapi import HTTPException

