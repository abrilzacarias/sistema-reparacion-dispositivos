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

# Los otros endpoints siguen igual...
@router.get("/{idEstado}", response_model=schemas.EstadoReparacionOut, summary="Obtener estado por ID")
def get_estado(idEstado: int, db: Session = Depends(get_db)):
    estado = services.get_estado_reparacion(db, idEstado)
    if not estado:
        raise HTTPException(status_code=404, detail="Estado no encontrado")
    return estado

# ... etc.

