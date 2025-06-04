from pydantic import BaseModel
from typing import Optional
from app.schemas.tipoContacto import TipoContactoOut  # Nombre corregido

class ContactoBase(BaseModel):
    descripcionContacto: Optional[str]
    idtipoContacto: int

class ContactoCreate(ContactoBase):
    pass

class ContactoUpdate(ContactoBase):
    pass

class ContactoOut(ContactoBase):
    idContacto: int
    tipoContacto: TipoContactoOut  # relación
    class Config:
        orm_mode = True
