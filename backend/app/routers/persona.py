from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List

from app.schemas import persona as schemas
from app.services import persona as persona_service
from app.database import get_db
from app.services.contacto import update_contacto
from app.services.domicilio import update_domicilio
from app.schemas.persona import PersonaOut, PersonaUpdate
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate


router = APIRouter(prefix="/personas", tags=["Personas"])

@router.get("/", response_model=Page[schemas.PersonaOut], summary="Obtener lista de personas")
def read_personas(
    db: Session = Depends(get_db),
    search: str = Query(None, description="Buscar por nombre, apellido, CUIT.")
):
    query = persona_service.get_personas(db, search)
    return paginate(query)

@router.get("/{idPersona}", response_model=schemas.PersonaOut, summary="Obtener persona por id")
def read_persona(idPersona: int, db: Session = Depends(get_db)):
    persona = persona_service.get_persona(db, idPersona)
    print(persona)
    if persona is None:
        raise HTTPException(status_code=404, detail="Persona no encontrada")
    return persona

@router.post("/", response_model=schemas.PersonaOut, status_code=status.HTTP_201_CREATED, summary="Crear una nueva persona")
def create_persona(persona: schemas.PersonaCreate, db: Session = Depends(get_db)):
    return persona_service.create_persona(db, persona)

@router.put("/{idPersona}", response_model=schemas.PersonaOut, summary="Actualizar una persona")
def update_persona(idPersona: int, persona: schemas.PersonaUpdate, db: Session = Depends(get_db)):
    print('router persona')
    db_persona = persona_service.update_persona(db, idPersona, persona)
    if db_persona is None:
        raise HTTPException(status_code=404, detail="Persona no encontrada")
    return db_persona

@router.delete("/{idPersona}", status_code=status.HTTP_204_NO_CONTENT, summary="Dar de baja (inhabilitar) una persona")
def delete_persona(idPersona: int, db: Session = Depends(get_db)):
    success = persona_service.delete_persona(db, idPersona)
    if not success:
        raise HTTPException(status_code=404, detail="Persona no encontrada")