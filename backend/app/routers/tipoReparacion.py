from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.tipoReparacion import TipoReparacionCreate, TipoReparacionUpdate, TipoReparacionOut
from app.services import tipoReparacion as tipo_reparacion_service

router = APIRouter(prefix="/tipoReparacion", tags=["tipoReparacion"])

@router.get("/", response_model=List[TipoReparacionOut])
def read_tipos_reparacion(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tipos = tipo_reparacion_service.get_tipos_reparacion(db, skip, limit)
    return tipos

@router.get("/{id}", response_model=TipoReparacionOut)
def read_tipo_reparacion(id: int, db: Session = Depends(get_db)):
    tipo = tipo_reparacion_service.get_tipo_reparacion(db, id)
    if not tipo:
        raise HTTPException(status_code=404, detail="TipoReparacion not found")
    return tipo

@router.post("/", response_model=TipoReparacionOut, status_code=status.HTTP_201_CREATED)
def create_tipo_reparacion(tipo: TipoReparacionCreate, db: Session = Depends(get_db)):
    return tipo_reparacion_service.create_tipo_reparacion(db, tipo)

@router.put("/{id}", response_model=TipoReparacionOut)
def update_tipo_reparacion(id: int, tipo: TipoReparacionUpdate, db: Session = Depends(get_db)):
    updated_tipo = tipo_reparacion_service.update_tipo_reparacion(db, id, tipo)
    if not updated_tipo:
        raise HTTPException(status_code=404, detail="TipoReparacion not found")
    return updated_tipo

@router.delete("/{id}", response_model=TipoReparacionOut)
def delete_tipo_reparacion(id: int, db: Session = Depends(get_db)):
    deleted_tipo = tipo_reparacion_service.delete_tipo_reparacion(db, id)
    if not deleted_tipo:
        raise HTTPException(status_code=404, detail="TipoReparacion not found")
    return deleted_tipo
