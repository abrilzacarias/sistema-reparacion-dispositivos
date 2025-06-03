from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas import contacto as schemas
from app.services import contacto as services
from app.database import get_db

router = APIRouter(prefix="/contactos", tags=["Contactos"])

@router.get("/", response_model=List[schemas.ContactoOut], summary="Listar contactos")
def read_contactos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return services.get_contactos(db, skip, limit)

@router.get("/{idContacto}", response_model=schemas.ContactoOut, summary="Obtener contacto por ID")
def read_contacto(idContacto: int, db: Session = Depends(get_db)):
    contacto = services.get_contacto(db, idContacto)
    if contacto is None:
        raise HTTPException(status_code=404, detail="Contacto no encontrado")
    return contacto

@router.post("/", response_model=schemas.ContactoOut, status_code=status.HTTP_201_CREATED, summary="Crear contacto")
def create_contacto(contacto: schemas.ContactoCreate, db: Session = Depends(get_db)):
    return services.create_contacto(db, contacto)

@router.put("/{idContacto}", response_model=schemas.ContactoOut, summary="Actualizar contacto")
def update_contacto(idContacto: int, contacto: schemas.ContactoUpdate, db: Session = Depends(get_db)):
    db_contacto = services.update_contacto(db, idContacto, contacto)
    if db_contacto is None:
        raise HTTPException(status_code=404, detail="Contacto no encontrado")
    return db_contacto
