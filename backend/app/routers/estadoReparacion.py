from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate

from app.database import get_db
from app.schemas import estadoReparacion as schemas
from app.services import estadoReparacion as services

router = APIRouter(prefix="/estado-reparacion", tags=["Estado Reparación"])

@router.get("/", response_model=Page[schemas.EstadoReparacionOut], summary="Obtener estados paginados")
def list_estados(db: Session = Depends(get_db)):
    return paginate(services.get_all_estado_reparacion(db))

@router.get("/{idEstado}", response_model=schemas.EstadoReparacionOut, summary="Obtener estado por ID")
def get_estado(idEstado: int, db: Session = Depends(get_db)):
    estado = services.get_estado_reparacion(db, idEstado)
    if not estado:
        raise HTTPException(status_code=404, detail="Estado no encontrado")
    return estado

@router.post("/", response_model=schemas.EstadoReparacionOut, status_code=status.HTTP_201_CREATED, summary="Crear nuevo estado")
def create_estado(estado: schemas.EstadoReparacionCreate, db: Session = Depends(get_db)):
    return services.create_estado_reparacion(db, estado)

@router.put("/{idEstado}", response_model=schemas.EstadoReparacionOut, summary="Actualizar un estado")
def update_estado(idEstado: int, estado: schemas.EstadoReparacionUpdate, db: Session = Depends(get_db)):
    updated = services.update_estado_reparacion(db, idEstado, estado)
    if not updated:
        raise HTTPException(status_code=404, detail="Estado no encontrado")
    return updated

@router.delete("/{idEstado}", status_code=status.HTTP_204_NO_CONTENT, summary="Eliminar un estado")
def delete_estado(idEstado: int, db: Session = Depends(get_db)):
    success = services.delete_estado_reparacion(db, idEstado)
    if not success:
        raise HTTPException(status_code=404, detail="Estado no encontrado")
# ... etc.

