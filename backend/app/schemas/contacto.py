from pydantic import BaseModel
from typing import Optional
from app.schemas.tipoContacto import TipoContactoOut  # Nombre corregido

class ContactoBase(BaseModel):
    descripcionContacto: Optional[str]
    idtipoContacto: int
    esPrimario: Optional[bool] = False

class ContactoCreate(BaseModel):
    descripcionContacto: str
    idtipoContacto: int
    esPrimario: bool

class ContactoUpdate(ContactoCreate):
    idContacto: Optional[int] = None 

class ContactoOut(ContactoBase):
    idContacto: int
    idPersona: int
    tipoContacto: TipoContactoOut

    class Config:
        orm_mode = True
