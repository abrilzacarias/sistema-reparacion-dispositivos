from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date

# Reutilizamos schemas de Persona y Contacto:
class ContactoOut(BaseModel):
    idContacto: int
    descripcionContacto: str
    idtipoContacto: int
    esPrimario: bool

    class Config:
        orm_mode = True

class PersonaOut(BaseModel):
    idPersona: int
    nombre: str
    apellido: str
    cuit: str
    fechaNacimiento: date
    contactos: List[ContactoOut]

    class Config:
        orm_mode = True

class ClienteBase(BaseModel):
    observaciones: Optional[str] = None

class ClienteCreate(ClienteBase):
    idPersona: int

class ClienteUpdate(ClienteBase):
    pass

class ClienteOut(ClienteBase):
    idCliente: int
    idPersona: int
    persona: PersonaOut

    class Config:
        orm_mode = True