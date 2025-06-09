from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate

from app.database import get_db
from app.schemas import historialAsignacionReparacion as schemas
from app.services import historialAsignacionReparacion as services

router = APIRouter(prefix="/historial-asignacion-reparacion", tags=["Historial Asignación Reparación"])

@router.get("/", response_model=Page[schemas.HistorialAsignacionReparacionOut], summary="Lista paginada del historial de asignación")
def read_historiales(
    search: str = Query(None, description="Buscar por nombre del empleado"),
    db: Session = Depends(get_db)
):
    historiales = services.get_historiales(db, search=search)
    return paginate(historiales)

@router.get("/{idHistorial}", response_model=schemas.HistorialAsignacionReparacionOut, summary="Obtener historial por ID")
def read_historial(idHistorial: int, db: Session = Depends(get_db)):
    historial = services.get_historial(db, idHistorial)
    if not historial:
        raise HTTPException(status_code=404, detail="Historial no encontrado")
    return historial

@router.post("/", response_model=schemas.HistorialAsignacionReparacionOut, status_code=status.HTTP_201_CREATED, summary="Crear historial de asignación")
def create_historial(historial: schemas.HistorialAsignacionReparacionCreate, db: Session = Depends(get_db)):
    return services.create_historial(db, historial)

@router.put("/{idHistorial}", response_model=schemas.HistorialAsignacionReparacionOut, summary="Actualizar historial")
def update_historial(idHistorial: int, historial: schemas.HistorialAsignacionReparacionUpdate, db: Session = Depends(get_db)):
    updated = services.update_historial(db, idHistorial, historial)
    if not updated:
        raise HTTPException(status_code=404, detail="Historial no encontrado")
    return updated

@router.get("/por-reparacion/{idReparacion}", response_model=Page[schemas.HistorialAsignacionReparacionOut], summary="Historial de asignación filtrado por idReparacion")
def read_historiales_por_reparacion(
    idReparacion: int,
    db: Session = Depends(get_db)
):
    historiales = services.get_historial_asignaciones_por_reparacion(db, idReparacion)
    return paginate(historiales)
