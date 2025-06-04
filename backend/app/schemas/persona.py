from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date
from .contacto import ContactoCreate, ContactoOut
from .domicilio import DomicilioCreate, DomicilioOut

class PersonaBase(BaseModel):
    cuit: str = Field(..., example="20-12345678-9")
    nombre: str = Field(..., example="Juan")
    apellido: str = Field(..., example="Pérez")
    fechaNacimiento: date = Field(..., example="1990-05-21")
    #estadoPersona: int = Field(..., example=1)  # <-- acá lo agregás
    contactos: Optional[List[ContactoCreate]] = []
    domicilios: Optional[List[DomicilioCreate]] = []

class PersonaCreate(PersonaBase):
    pass

class PersonaUpdate(PersonaBase):
    pass

class PersonaOut(PersonaBase):
    idPersona: int
    estadoPersona: int  # ← Agregá esta línea
    domicilios : List [DomicilioOut]
    contactos: List[ContactoOut]
    

    class Config:
        orm_mode = True
