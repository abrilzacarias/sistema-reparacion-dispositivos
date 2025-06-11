from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from app.schemas.tipoDomicilio import TipoDomicilioOut  # <-- Importar desde el otro archivo

class DomicilioBase(BaseModel):
    codigoPostal: Optional[str]
    pais: Optional[str]
    provincia: Optional[str]
    ciudad: Optional[str]
    barrio: str
    calle: str
    departamento: str
    idtipoDomicilio: int

class DomicilioCreate(DomicilioBase):
    idPersona: Optional[int] = None

class DomicilioUpdate(DomicilioBase):
    pass

class DomicilioOut(DomicilioBase):
    idDomicilio: int
    idPersona: int
    tipoDomicilio: TipoDomicilioOut  # ✅ igual que contacto

    class Config:
        orm_mode = True
