from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from app.schemas.tipoDomicilio import TipoDomicilioOut  # <-- Importar desde el otro archivo


class PersonaBase(BaseModel):
    cuit: str = Field(..., example="20-87654321-0")
    nombre: str = Field(..., example="María")
    apellido: str = Field(..., example="Gómez")
    fechaNacimiento: date = Field(..., example="1985-12-10")

class PersonaOut(PersonaBase):
    idPersona: int

    class Config:
        orm_mode = True
        
class DomicilioBase(BaseModel):
    idDomicilio: int
    codigoPostal: Optional[str]
    pais: Optional[str]
    provincia: Optional[str]
    ciudad: Optional[str]
    barrio: str
    calle: str
    departamento: str
    idtipoDomicilio: int
    idPersona: int
    persona: PersonaOut  # 👈 Este es el punto clave

class DomicilioCreate(DomicilioBase):
    pass

class DomicilioUpdate(DomicilioBase):
    pass

class DomicilioSchema(DomicilioBase):
    idDomicilio: int
    tipoDomicilio: TipoDomicilioOut  # Aquí se usa el esquema OUT

    class Config:
        orm_mode = True

class DomicilioOut(DomicilioSchema):
    pass
