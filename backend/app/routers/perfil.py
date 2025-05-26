from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas import perfil as schemas
from app.services import perfil as perfil_service
from app.database import get_db
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate

router = APIRouter(prefix="/perfiles", tags=["Perfiles"])

@router.get("/", response_model=Page[schemas.PerfilOut], summary="Obtener lista de perfiles")
def read_perfiles(db: Session = Depends(get_db)):
    query = perfil_service.get_perfiles(db)
    return paginate(db, query)

@router.get("/{idPerfil}", response_model=schemas.PerfilOut, summary="Obtener perfil por id")
def read_perfil(idPerfil: int, db: Session = Depends(get_db)):
    perfil = perfil_service.get_perfil(db, idPerfil)
    if perfil is None:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
    return perfil

@router.post("/", response_model=schemas.PerfilOut, status_code=status.HTTP_201_CREATED, summary="Crear un nuevo perfil")
def create_perfil(perfil: schemas.PerfilCreate, db: Session = Depends(get_db)):
    return perfil_service.create_perfil(db, perfil)

@router.put("/{idPerfil}", response_model=schemas.PerfilOut, summary="Actualizar un perfil")
def update_perfil(idPerfil: int, perfil: schemas.PerfilUpdate, db: Session = Depends(get_db)):
    db_perfil = perfil_service.update_perfil(db, idPerfil, perfil)
    if db_perfil is None:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
    return db_perfil

@router.delete("/{idPerfil}", status_code=status.HTTP_204_NO_CONTENT, summary="Eliminar un perfil")
def delete_perfil(idPerfil: int, db: Session = Depends(get_db)):
    success = perfil_service.delete_perfil(db, idPerfil)
    if not success:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
