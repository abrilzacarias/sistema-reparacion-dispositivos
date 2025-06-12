from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate

from app.database import get_db
from app.schemas import moduloFuncionSistema as schemas
from app.services import moduloFuncionSistema as services

router = APIRouter(prefix="/modulos-funcion", tags=["Modulos-Funcion del Sistema"])

@router.get("/", response_model=Page[schemas.ModuloFuncionSistemaOut], summary="Obtener lista paginada de modulos-funcion")
def read_modulos_funcion(db: Session = Depends(get_db)):
    modulos_funcion = services.get_modulos_funcion(db)
    return paginate(modulos_funcion)

@router.get("/{id}", response_model=schemas.ModuloFuncionSistemaOut, summary="Obtener un modulo-funcion por ID")
def read_modulo_funcion(id: int, db: Session = Depends(get_db)):
    modulo_funcion = services.get_modulo_funcion(db, id)
    if not modulo_funcion:
        raise HTTPException(status_code=404, detail="Modulo-Funcion no encontrado")
    return modulo_funcion

@router.post("/", response_model=schemas.ModuloFuncionSistemaOut, status_code=status.HTTP_201_CREATED, summary="Crear un nuevo modulo-funcion")
def create_modulo_funcion(modulo_funcion: schemas.ModuloFuncionSistemaCreate, db: Session = Depends(get_db)):
    return services.create_modulo_funcion(db, modulo_funcion)

@router.put("/{id}", response_model=schemas.ModuloFuncionSistemaOut, summary="Actualizar un modulo-funcion")
def update_modulo_funcion(id: int, modulo_funcion: schemas.ModuloFuncionSistemaUpdate, db: Session = Depends(get_db)):
    updated = services.update_modulo_funcion(db, id, modulo_funcion)
    if not updated:
        raise HTTPException(status_code=404, detail="Modulo-Funcion no encontrado")
    return updated


@router.put("/modulo/{id}/funciones", summary="Actualizar las funciones asociadas a un módulo")
def update_funciones_modulo(
    id: int,
    funciones_update: schemas.ModuloFuncionesUpdateSchema,
    db: Session = Depends(get_db)
):
    result = services.actualizar_funciones_modulo(db, id, funciones_update.funciones_ids)
    if not result:
        raise HTTPException(status_code=404, detail="Módulo no encontrado")
    return {"detail": "Funciones del módulo actualizadas correctamente"}

"""
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT, summary="Eliminar un modulo-funcion")
def delete_modulo_funcion(id: int, db: Session = Depends(get_db)):
    success = services.delete_modulo_funcion(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="Modulo-Funcion no encontrado")
"""