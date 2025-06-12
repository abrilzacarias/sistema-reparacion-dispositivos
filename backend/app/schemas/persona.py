from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date
from .contacto import ContactoCreate, ContactoOut, ContactoUpdate
from .domicilio import DomicilioCreate, DomicilioOut, DomicilioUpdate

class PersonaBase(BaseModel):
    cuit: str = Field(..., example="20-12345678-9")
    nombre: str = Field(..., example="Juan")
    apellido: str = Field(..., example="Pérez")
    fechaNacimiento: date = Field(..., example="1990-05-21")
    contactos: Optional[List[ContactoCreate]] = []
    domicilios: Optional[List[DomicilioCreate]] = []

class PersonaCreate(PersonaBase):
    pass

class PersonaUpdate(PersonaBase):
    domicilios: List [DomicilioUpdate]
    contactos: List[ContactoUpdate]

class PersonaOut(PersonaBase):
    idPersona: int
    estadoPersona: int
    domicilios : List [DomicilioOut]
    contactos: List[ContactoOut]
    empleado: Optional["EmpleadoOutReduced"] = None 
    cliente: Optional["ClienteOut"] = None

    class Config:
        orm_mode = True

class PersonaOutReduced(BaseModel):
    idPersona: int
    estadoPersona: int
    cuit: str
    nombre: str
    apellido: str
    fechaNacimiento: date
    domicilios : List [DomicilioOut]
    contactos: List[ContactoOut]

    class Config:
        orm_mode = True

from app.schemas.empleado import EmpleadoOutReduced
from app.schemas.cliente import ClienteOut