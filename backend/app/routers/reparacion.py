from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate

from app.database import get_db
from app.schemas.reparacion import ReparacionCreate, ReparacionUpdate, ReparacionOut
from app.services import reparacion as reparacion_service

router = APIRouter(prefix="/reparaciones", tags=["reparaciones"])

@router.get("/summary-status", summary="Conteo de reparaciones por estado actual")
def reparaciones_summary_status(db: Session = Depends(get_db)):
    return reparacion_service.get_reparaciones_status_summary(db)

@router.get("/", response_model=Page[ReparacionOut])
def read_reparaciones(db: Session = Depends(get_db)):
    return paginate(reparacion_service.get_reparaciones(db))

@router.get("/{id}", response_model=ReparacionOut)
def read_reparacion(id: int, db: Session = Depends(get_db)):
    reparacion = reparacion_service.get_reparacion(db, id)
    if not reparacion:
        raise HTTPException(status_code=404, detail="Reparacion no encontrada")
    return reparacion

@router.post("/", response_model=ReparacionOut, status_code=status.HTTP_201_CREATED)
def create_reparacion(reparacion: ReparacionCreate, db: Session = Depends(get_db)):
    return reparacion_service.create_reparacion(db, reparacion)

@router.put("/{id}", response_model=ReparacionOut)
def update_reparacion(id: int, reparacion: ReparacionUpdate, db: Session = Depends(get_db)):
    updated = reparacion_service.update_reparacion(db, id, reparacion)
    if not updated:
        raise HTTPException(status_code=404, detail="Reparacion no encontrada")
    return updated

@router.delete("/{id}", response_model=ReparacionOut)
def delete_reparacion(id: int, db: Session = Depends(get_db)):
    try:
        deleted = reparacion_service.delete_reparacion(db, id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Reparación no encontrada")
        return deleted
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error inesperado al eliminar reparación: {e}")
        raise HTTPException(status_code=500, detail="Error inesperado al eliminar la reparación.")


