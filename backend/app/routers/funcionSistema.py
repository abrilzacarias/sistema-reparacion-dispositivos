from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate

from app.database import get_db
from app.schemas import funcionSistema as schemas
from app.services import funcionSistema as services

router = APIRouter(prefix="/funciones-sistema", tags=["Funciones del Sistema"])

@router.get("/", response_model=Page[schemas.FuncionSistemaOut], summary="Obtener lista paginada de funciones del sistema")
def read_funciones_sistema(db: Session = Depends(get_db)):
    funciones = services.get_funciones_sistema(db)
    return paginate(funciones)

@router.get("/{idFuncion}", response_model=schemas.FuncionSistemaOut, summary="Obtener una función del sistema por ID")
def read_funcion_sistema(idFuncion: int, db: Session = Depends(get_db)):
    funcion = services.get_funcion_sistema(db, idFuncion)
    if not funcion:
        raise HTTPException(status_code=404, detail="Función del sistema no encontrada")
    return funcion

@router.post("/", response_model=schemas.FuncionSistemaOut, status_code=status.HTTP_201_CREATED, summary="Crear nueva función del sistema")
def create_funcion_sistema(funcion: schemas.FuncionSistemaCreate, db: Session = Depends(get_db)):
    return services.create_funcion_sistema(db, funcion)

@router.put("/{idFuncion}", response_model=schemas.FuncionSistemaOut, summary="Actualizar función del sistema existente")
def update_funcion_sistema(idFuncion: int, funcion: schemas.FuncionSistemaUpdate, db: Session = Depends(get_db)):
    updated = services.update_funcion_sistema(db, idFuncion, funcion)
    if not updated:
        raise HTTPException(status_code=404, detail="Función del sistema no encontrada")
    return updated

@router.delete("/{idfuncion}", status_code=status.HTTP_204_NO_CONTENT)
def delete_funcion_sistema(idfuncion: int, db: Session = Depends(get_db)):
    success = services.delete_funcion_sistema(db, idfuncion)
    if not success:
        raise HTTPException(status_code=404, detail="Función no encontrada")