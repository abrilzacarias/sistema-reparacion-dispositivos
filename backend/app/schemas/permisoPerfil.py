from pydantic import BaseModel
from typing import Optional

class PermisoPerfilBase(BaseModel):
    idpermisoPerfil: int
    idPerfil: int
    idmoduloFuncionSistema: int
    estadoPermisoPerfil: Optional[int] = 1

class PermisoPerfilCreate(PermisoPerfilBase):
    pass

class PermisoPerfilUpdate(BaseModel):
    estadoPermisoPerfil: Optional[int]

class PermisoPerfilOut(PermisoPerfilBase):
    idpermisoPerfil: int

    class Config:
        orm_mode = True