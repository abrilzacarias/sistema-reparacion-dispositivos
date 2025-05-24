from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

class PersonaBase(BaseModel):
    cuit: str = Field(..., example="20-87654321-0")
    nombre: str = Field(..., example="María")
    apellido: str = Field(..., example="Gómez")
    fechaNacimiento: date = Field(..., example="1985-12-10")

class PersonaOut(PersonaBase):
    idPersona: int

    class Config:
        orm_mode = True

class ClienteBase(BaseModel):
    observaciones: Optional[str] = None
    idPersona: int

class ClienteCreate(ClienteBase):
    pass

class ClienteUpdate(ClienteBase):
    pass

class ClienteOut(ClienteBase):
    idCliente: int
    persona: PersonaOut  # nested schema

    class Config:
        orm_mode = True
