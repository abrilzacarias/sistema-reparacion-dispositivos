from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate

from app.database import get_db
from app.schemas import moduloSistema as schemas
from app.services import moduloSistema as services



router = APIRouter(prefix="/modulos-sistema", tags=["Modulos del Sistema"])

@router.get("/", response_model=Page[schemas.ModuloSistemaOut], summary="Obtener lista paginada de modulos del sistema")
def read_modulos_sistema(db: Session = Depends(get_db)):
    modulos = services.get_modulos_sistema(db)
    return paginate(modulos)

@router.get("/{idmodulo}", response_model=schemas.ModuloSistemaOut, summary="Obtener un modulo del sistema por ID")
def read_modulo_sistema(idmodulo: int, db: Session = Depends(get_db)):
    modulo = services.get_modulo_sistema(db, idmodulo)
    if not modulo:
        raise HTTPException(status_code=404, detail="Modulo del sistema no encontrada")
    return modulo

@router.post("/", response_model=schemas.ModuloSistemaOut, status_code=status.HTTP_201_CREATED, summary="Crear nueva modulo del sistema")
def create_modulo_sistema(modulo: schemas.ModuloSistemaCreate, db: Session = Depends(get_db)):
    return services.create_modulo_sistema(db, modulo)

@router.put("/{idmodulo}", response_model=schemas.ModuloSistemaOut, summary="Actualizar modulo del sistema existente")
def update_modulo_sistema(idmodulo: int, modulo: schemas.ModuloSistemaUpdate, db: Session = Depends(get_db)):
    updated = services.update_modulo_sistema(db, idmodulo, modulo)
    if not updated:
        raise HTTPException(status_code=404, detail="Modulo del sistema no encontrada")
    return updated

@router.delete("/{idmodulo}", status_code=status.HTTP_204_NO_CONTENT)
def delete_modulo_sistema(idmodulo: int, db: Session = Depends(get_db)):
    success = services.delete_modulo_sistema(db, idmodulo)
    if not success:
        raise HTTPException(status_code=404, detail="Modulo no encontrado")