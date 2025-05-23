from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas import persona as schemas
from app.services import persona as services 
from app.database import get_db

router = APIRouter(prefix="/personas", tags=["Personas"])

@router.get("/", response_model=List[schemas.PersonaOut], summary="Obtener lista de personas")
def read_personas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    personas = services.get_personas(db, skip=skip, limit=limit)
    return personas

@router.get("/{idPersona}", response_model=schemas.PersonaOut, summary="Obtener persona por id")
def read_persona(idPersona: int, db: Session = Depends(get_db)):
    persona = services.get_persona(db, idPersona)
    if persona is None:
        raise HTTPException(status_code=404, detail="Persona no encontrada")
    return persona

@router.post("/", response_model=schemas.PersonaOut, status_code=status.HTTP_201_CREATED, summary="Crear una nueva persona")
def create_persona(persona: schemas.PersonaCreate, db: Session = Depends(get_db)):
    return services.create_persona(db, persona)

@router.put("/{idPersona}", response_model=schemas.PersonaOut, summary="Actualizar una persona")
def update_persona(idPersona: int, persona: schemas.PersonaUpdate, db: Session = Depends(get_db)):
    db_persona = services.update_persona(db, idPersona, persona)
    if db_persona is None:
        raise HTTPException(status_code=404, detail="Persona no encontrada")
    return db_persona