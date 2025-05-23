from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas import tipoDomicilio as schemas
from app.services import tipoDomicilio as services
from app.database import get_db

router = APIRouter(prefix="/tipo-domicilios", tags=["TipoDomicilios"])

@router.get("/", response_model=List[schemas.TipoDomicilioOut], summary="Listar tipos de domicilio")
def read_tipos_domicilio(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return services.get_tipos_domicilio(db, skip, limit)

@router.get("/{idtipoDomicilio}", response_model=schemas.TipoDomicilioOut, summary="Obtener tipo de domicilio por ID")
def read_tipo_domicilio(idtipoDomicilio: int, db: Session = Depends(get_db)):
    tipo = services.get_tipo_domicilio(db, idtipoDomicilio)
    if not tipo:
        raise HTTPException(status_code=404, detail="Tipo de domicilio no encontrado")
    return tipo

@router.post("/", response_model=schemas.TipoDomicilioOut, status_code=status.HTTP_201_CREATED, summary="Crear tipo de domicilio")
def create_tipo_domicilio(tipo: schemas.TipoDomicilioCreate, db: Session = Depends(get_db)):
    return services.create_tipo_domicilio(db, tipo)

@router.put("/{idtipoDomicilio}", response_model=schemas.TipoDomicilioOut, summary="Actualizar tipo de domicilio")
def update_tipo_domicilio(idtipoDomicilio: int, tipo: schemas.TipoDomicilioUpdate, db: Session = Depends(get_db)):
    db_tipo = services.update_tipo_domicilio(db, idtipoDomicilio, tipo)
    if not db_tipo:
        raise HTTPException(status_code=404, detail="Tipo de domicilio no encontrado")
    return db_tipo
