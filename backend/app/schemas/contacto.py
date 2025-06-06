from pydantic import BaseModel
from typing import Optional
from app.schemas.tipoContacto import TipoContactoOut  # Nombre corregido

class ContactoBase(BaseModel):
    descripcionContacto: Optional[str]
    idtipoContacto: int
    esPrimario: Optional[bool] = False

class ContactoCreate(ContactoBase):
    idPersona: int 


class ContactoUpdate(ContactoBase):
    pass  


class ContactoOut(ContactoBase):
    idContacto: int
    idPersona: int
    tipoContacto: TipoContactoOut

    class Config:
        orm_mode = True
