from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from app.schemas.tipoDomicilio import TipoDomicilioOut 

class DomicilioBase(BaseModel):
    codigoPostal: Optional[str]
    pais: Optional[str]
    provincia: Optional[str]
    ciudad: Optional[str]
    barrio: str
    calle: str
    numero: str
    departamento: str
    idtipoDomicilio: int

class DomicilioCreate(DomicilioBase):
    idPersona: Optional[int] = None


class DomicilioOut(DomicilioBase):
    idDomicilio: int
    idPersona: int
    tipoDomicilio: TipoDomicilioOut

    class Config:
        orm_mode = True

class DomicilioUpdate(BaseModel):
    idDomicilio: Optional[int]
    codigoPostal: str
    pais: str
    provincia: str
    ciudad: str
    barrio: str
    calle: str
    numero: str
    departamento: Optional[str]
    idtipoDomicilio: int 
    idPersona: Optional[int]
