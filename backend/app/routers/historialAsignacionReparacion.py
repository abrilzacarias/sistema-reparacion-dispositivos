from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate

from app.database import get_db
from app.schemas import historialAsignacionReparacion as schemas
from app.services import historialAsignacionReparacion as services

router = APIRouter(prefix="/historial-asignacion-reparacion", tags=["Historial Asignación Reparación"])

@router.get("/", response_model=Page[schemas.HistorialAsignacionReparacionOut], summary="Obtener lista paginada de historiales de asignación de reparación")
def read_historiales(db: Session = Depends(get_db)):
    historiales = services.get_historiales(db)
    return paginate(historiales)

@router.get("/{id}", response_model=schemas.HistorialAsignacionReparacionOut, summary="Obtener historial de reparación por ID")
def read_historial(id: int, db: Session = Depends(get_db)):
    historial = services.get_historial(db, id)
    if not historial:
        raise HTTPException(status_code=404, detail="Historial no encontrado")
    return historial

@router.post("/", response_model=schemas.HistorialAsignacionReparacionOut, status_code=status.HTTP_201_CREATED, summary="Crear nuevo historial de asignación de reparación")
def create_historial(historial: schemas.HistorialAsignacionReparacionCreate, db: Session = Depends(get_db)):
    return services.create_historial(db, historial)

@router.put("/{id}", response_model=schemas.HistorialAsignacionReparacionOut, summary="Actualizar historial existente")
def update_historial(id: int, historial: schemas.HistorialAsignacionReparacionUpdate, db: Session = Depends(get_db)):
    updated = services.update_historial(db, id, historial)
    if not updated:
        raise HTTPException(status_code=404, detail="Historial no encontrado")
    return updated

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT, summary="Eliminar historial por ID")
def delete_historial(id: int, db: Session = Depends(get_db)):
    success = services.delete_historial(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="Historial no encontrado")
