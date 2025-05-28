from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.services.repuesto import get_repuestos_by_marca
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate
from app.schemas import repuesto as schemas
from app.services import repuesto as services
from app.database import get_db

router = APIRouter(prefix="/repuestos", tags=["Repuestos"])

@router.get("/", response_model=Page[schemas.RepuestoWithMarcaTipo], summary="Obtener lista de repuestos")
def read_repuestos(db: Session = Depends(get_db)):
    return paginate(services.get_repuestos(db))

# Obtener repuesto específico CON información de marca
@router.get("/{idRepuesto}", response_model=schemas.RepuestoWithMarcaTipo, summary="Obtener repuesto por id con información de marca")
def read_repuesto(idRepuesto: int, db: Session = Depends(get_db)):
    repuesto = services.get_repuesto(db, idRepuesto)
    if repuesto is None:
        raise HTTPException(status_code=404, detail="Repuesto no encontrado")
    return repuesto

# Obtener repuestos por marca (útil para filtrar)
@router.get("/marca/{idMarcaDispositivo}", response_model=Page[schemas.RepuestoOut], summary="Obtener repuestos por marca")
def read_repuestos_by_marca(idMarcaDispositivo: int, db: Session = Depends(get_db)):
    return paginate(services.get_repuestos_by_marca(db, idMarcaDispositivo))

@router.post("/", response_model=schemas.RepuestoOut, status_code=status.HTTP_201_CREATED, summary="Crear un nuevo repuesto")
def create_repuesto(repuesto: schemas.RepuestoCreate, db: Session = Depends(get_db)):
    return services.create_repuesto(db, repuesto)

@router.put("/{idRepuesto}", response_model=schemas.RepuestoOut, summary="Actualizar un repuesto")
def update_repuesto(idRepuesto: int, repuesto: schemas.RepuestoUpdate, db: Session = Depends(get_db)):
    db_repuesto = services.update_repuesto(db, idRepuesto, repuesto)
    if db_repuesto is None:
        raise HTTPException(status_code=404, detail="Repuesto no encontrado")
    return db_repuesto

@router.delete("/{idRepuesto}", status_code=status.HTTP_204_NO_CONTENT, summary="Eliminar un repuesto")
def delete_repuesto(idRepuesto: int, db: Session = Depends(get_db)):
    db_repuesto = services.delete_repuesto(db, idRepuesto)
    if db_repuesto is None:
        raise HTTPException(status_code=404, detail="Repuesto no encontrado")
    return