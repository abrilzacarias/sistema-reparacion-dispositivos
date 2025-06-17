from pydantic import BaseModel, Field
from .permisoPerfil import PermisoPerfilOut
from typing import List

class PerfilBase(BaseModel):
    nombrePerfil: str = Field(..., example="Administrador")

class PerfilCreate(PerfilBase):
    pass

class PerfilUpdate(PerfilBase):
    pass

class PerfilOut(PerfilBase):
    idPerfil: int
    nombrePerfil: str
    permisos: List[PermisoPerfilOut] = []

    class Config:
        orm_mode = True

class PerfilOutReduced(BaseModel):
    idPerfil: int
    nombrePerfil: str

    class Config:
        orm_mode = True