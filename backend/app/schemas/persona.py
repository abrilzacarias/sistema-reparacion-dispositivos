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
    #estadoPersona: int = Field(..., example=1)
    contactos: Optional[List[ContactoCreate]] = []
    domicilios: Optional[List[DomicilioCreate]] = []

class PersonaCreate(PersonaBase):
    pass

class PersonaUpdate(PersonaBase):
    pass

class PersonaOut(PersonaBase):
    idPersona: int
    estadoPersona: int
    domicilios : List [DomicilioOut]
    contactos: List[ContactoOut]
    empleado: Optional["EmpleadoOut"] = None 
    cliente: Optional["ClienteOut"] = None

    class Config:
        orm_mode = True

# Importación al final para evitar circular import
from app.schemas.empleado import EmpleadoOut
from app.schemas.cliente import ClienteOut