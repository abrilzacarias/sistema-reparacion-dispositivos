from pydantic import BaseModel, Field
from datetime import date

class PersonaBase(BaseModel):
    cuit: str = Field(..., example="20-12345678-9")
    nombre: str = Field(..., example="Juan")
    apellido: str = Field(..., example="Pérez")
    fechaNacimiento: date = Field(..., example="1990-05-21")
    #estadoPersona: int = Field(..., example=1)  # <-- acá lo agregás

class PersonaCreate(PersonaBase):
    pass

class PersonaUpdate(PersonaBase):
    pass

class PersonaOut(PersonaBase):
    idPersona: int
    estadoPersona: int  # ← Agregá esta línea

    class Config:
        orm_mode = True
