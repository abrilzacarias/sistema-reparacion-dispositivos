from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate

from app.schemas import modeloDispositivo as schemas
from app.services import modeloDispositivo as services
from app.database import get_db
from fastapi_pagination import paginate, Params
from fastapi_pagination.bases import AbstractPage
from fastapi_pagination.ext.sqlalchemy import paginate as sqlalchemy_paginate

router = APIRouter(prefix="/modelos", tags=["Modelos de Dispositivo"])

@router.get("/", response_model=List[schemas.ModeloDispositivoOut], summary="Obtener todos los modelos")
def read_modelos(db: Session = Depends(get_db)):
    modelos = services.get_modelos_dispositivo(db)  # supongo que devuelve un Query o lista
    return modelos  # devolver lista directamente


@router.get("/paginado", response_model=Page[schemas.ModeloDispositivoOut], summary="Obtener todos los modelos")
def read_modelos(
    db: Session = Depends(get_db),
    params: Params = Depends()
):
    query = services.get_modelos_dispositivo(db)
    return sqlalchemy_paginate(query, params)


@router.get("/{idModeloDispositivo}", response_model=schemas.ModeloDispositivoOut, summary="Obtener un modelo por ID")
def read_modelo(idModeloDispositivo: int, db: Session = Depends(get_db)):
    modelo = services.get_modelo_dispositivo(db, idModeloDispositivo)
    if not modelo:
        raise HTTPException(status_code=404, detail="Modelo no encontrado")
    return modelo

@router.post("/", response_model=schemas.ModeloDispositivoOut, status_code=status.HTTP_201_CREATED, summary="Crear un nuevo modelo")
def create_modelo(modelo: schemas.ModeloDispositivoCreate, db: Session = Depends(get_db)):
    return services.create_modelo_dispositivo(db, modelo)

@router.put("/{idModeloDispositivo}", response_model=schemas.ModeloDispositivoOut, summary="Actualizar un modelo")
def update_modelo(idModeloDispositivo: int, modelo: schemas.ModeloDispositivoUpdate, db: Session = Depends(get_db)):
    db_modelo = services.update_modelo_dispositivo(db, idModeloDispositivo, modelo)
    if not db_modelo:
        raise HTTPException(status_code=404, detail="Modelo no encontrado")
    return db_modelo

@router.delete("/{idModeloDispositivo}", summary="Eliminar un modelo")
def delete_modelo(idModeloDispositivo: int, db: Session = Depends(get_db)):
    modelo = services.delete_modelo_dispositivo(db, idModeloDispositivo)
    if not modelo:
        raise HTTPException(status_code=404, detail="Modelo no encontrado")
    return {"mensaje": "Modelo dado de baja correctamente"}
