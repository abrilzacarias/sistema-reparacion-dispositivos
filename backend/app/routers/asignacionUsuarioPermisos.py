from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate

from app.database import get_db
from app.schemas import asignacionUsuarioPermisos as schemas
from app.services import asignacionUsuarioPermisos as services

router = APIRouter(prefix="/asignaciones-usuario-permiso", tags=["Asignaciones Usuario-Permiso"])

@router.get("/", response_model=Page[schemas.AsignacionUsuarioPermisosOut], summary="Obtener lista paginada de asignaciones")
def read_asignaciones(db: Session = Depends(get_db)):
    asignaciones = services.get_asignaciones(db)
    return paginate(asignaciones)

@router.get("/{idasignacion}", response_model=schemas.AsignacionUsuarioPermisosOut, summary="Obtener una asignación por ID")
def read_asignacion(idasignacion: int, db: Session = Depends(get_db)):
    asignacion = services.get_asignacion(db, idasignacion)
    if not asignacion:
        raise HTTPException(status_code=404, detail="Asignación no encontrada")
    return asignacion

@router.post("/", response_model=schemas.AsignacionUsuarioPermisosOut, status_code=status.HTTP_201_CREATED, summary="Crear nueva asignación")
def create_asignacion(asignacion: schemas.AsignacionUsuarioPermisosCreate, db: Session = Depends(get_db)):
    return services.create_asignacion(db, asignacion)

@router.put("/{idasignacion}", response_model=schemas.AsignacionUsuarioPermisosOut, summary="Actualizar una asignación existente")
def update_asignacion(idasignacion: int, asignacion: schemas.AsignacionUsuarioPermisosUpdate, db: Session = Depends(get_db)):
    updated = services.update_asignacion(db, idasignacion, asignacion)
    if not updated:
        raise HTTPException(status_code=404, detail="Asignación no encontrada")
    return updated

@router.delete("/{idasignacion}", status_code=status.HTTP_204_NO_CONTENT)
def delete_asignacion(idasignacion: int, db: Session = Depends(get_db)):
    success = services.delete_asignacion(db, idasignacion)
    if not success:
        raise HTTPException(status_code=404, detail="Asignación no encontrada")
