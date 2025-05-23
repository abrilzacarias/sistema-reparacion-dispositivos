from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas import domicilio as schemas
from app.services import domicilio as services
from app.database import get_db

router = APIRouter(prefix="/domicilios", tags=["Domicilios"])

@router.get("/", response_model=List[schemas.DomicilioOut], summary="Listar domicilios")
def read_domicilios(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return services.get_domicilios(db, skip, limit)

@router.get("/{idDomicilio}", response_model=schemas.DomicilioOut, summary="Obtener domicilio por ID")
def read_domicilio(idDomicilio: int, db: Session = Depends(get_db)):
    domicilio = services.get_domicilio(db, idDomicilio)
    if domicilio is None:
        raise HTTPException(status_code=404, detail="Domicilio no encontrado")
    return domicilio

@router.post("/", response_model=schemas.DomicilioOut, status_code=status.HTTP_201_CREATED, summary="Crear domicilio")
def create_domicilio(domicilio: schemas.DomicilioCreate, db: Session = Depends(get_db)):
    return services.create_domicilio(db, domicilio)

@router.put("/{idDomicilio}", response_model=schemas.DomicilioOut, summary="Actualizar domicilio")
def update_domicilio(idDomicilio: int, domicilio: schemas.DomicilioUpdate, db: Session = Depends(get_db)):
    db_domicilio = services.update_domicilio(db, idDomicilio, domicilio)
    if db_domicilio is None:
        raise HTTPException(status_code=404, detail="Domicilio no encontrado")
    return db_domicilio
