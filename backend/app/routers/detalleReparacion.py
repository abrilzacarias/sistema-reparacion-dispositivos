from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.detalleReparacion import (
    DetalleReparacionOut, 
    DetalleReparacionCreate, 
    DetalleReparacionUpdate,
)
from app.services.detalleReparacion import get_all, get_by_id, create, update, delete
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate
from app.models.detallereparacion import DetalleReparacion

router = APIRouter(prefix="/detalleReparacion", tags=["Detalle Reparacion"])

@router.get("/reparacion/{reparacion_id}", response_model=Page[DetalleReparacionOut])
def read_detalles_by_reparacion(reparacion_id: int, db: Session = Depends(get_db)):
    query = db.query(DetalleReparacion).filter(DetalleReparacion.idReparacion == reparacion_id)
    return paginate(query)

@router.get("/", response_model=Page[DetalleReparacionOut], summary="Obtener lista paginada de detalles de reparación")
def read_detalles(db: Session = Depends(get_db)):
    return paginate(get_all(db))


@router.get("/{detalle_id}", response_model=DetalleReparacionOut)
def read_detalle(detalle_id: int, db: Session = Depends(get_db)):
    detalle = get_by_id(db, detalle_id)
    if not detalle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Detalle Reparacion not found")
    return detalle

@router.post("/", response_model=DetalleReparacionOut, status_code=status.HTTP_201_CREATED)
def create_detalle(detalle: DetalleReparacionCreate, db: Session = Depends(get_db)):
    return create(db, detalle)

@router.put("/{detalle_id}", response_model=DetalleReparacionOut)
def update_detalle(detalle_id: int, detalle_update: DetalleReparacionUpdate, db: Session = Depends(get_db)):
    detalle = update(db, detalle_id, detalle_update)
    if not detalle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Detalle Reparacion not found")
    return detalle

@router.delete("/{detalle_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_detalle(detalle_id: int, db: Session = Depends(get_db)):
    success = delete(db, detalle_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Detalle Reparacion not found")
    return None
