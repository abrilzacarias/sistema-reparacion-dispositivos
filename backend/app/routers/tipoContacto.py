from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas import tipoContacto as schemas
from app.services import tipoContacto as services
from app.database import get_db

router = APIRouter(prefix="/tipos-contacto", tags=["Tipos de Contacto"])

@router.get("/", response_model=List[schemas.TipoContactoOut], summary="Listar tipos de contacto")
def read_tipos_contacto(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return services.get_tipos_contacto(db, skip, limit)

@router.get("/{idTipoContacto}", response_model=schemas.TipoContactoOut, summary="Obtener tipo de contacto por ID")
def read_tipo_contacto(idTipoContacto: int, db: Session = Depends(get_db)):
    tipo = services.get_tipo_contacto(db, idTipoContacto)
    if not tipo:
        raise HTTPException(status_code=404, detail="Tipo de contacto no encontrado")
    return tipo

@router.post("/", response_model=schemas.TipoContactoOut, status_code=status.HTTP_201_CREATED, summary="Crear tipo de contacto")
def create_tipo_contacto(tipo: schemas.TipoContactoCreate, db: Session = Depends(get_db)):
    return services.create_tipo_contacto(db, tipo)

@router.put("/{idTipoContacto}", response_model=schemas.TipoContactoOut, summary="Actualizar tipo de contacto")
def update_tipo_contacto(idTipoContacto: int, tipo: schemas.TipoContactoUpdate, db: Session = Depends(get_db)):
    db_tipo = services.update_tipo_contacto(db, idTipoContacto, tipo)
    if not db_tipo:
        raise HTTPException(status_code=404, detail="Tipo de contacto no encontrado")
    return db_tipo
