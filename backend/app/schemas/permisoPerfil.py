from pydantic import BaseModel
from typing import Optional, List
from .perfil import PerfilOut
from .moduloFuncionSistema import ModuloFuncionSistemaOut
from .funcionSistema import FuncionSistemaOut

class PermisoPerfilBase(BaseModel):
    idpermisoPerfil: int
    idPerfil: int
    idmoduloFuncionSistema: int
    estadoPermisoPerfil: Optional[int] = 1

class PermisoPerfilCreate(PermisoPerfilBase):
    pass

class PermisoPerfilUpdate(BaseModel):
    estadoPermisoPerfil: Optional[int]

class PermisoPerfilOut(BaseModel):
    idpermisoPerfil: int
    idperfil: int
    idmoduloFuncionSistema: int
    perfil: PerfilOut
    moduloFuncionSistema: ModuloFuncionSistemaOut 

    class Config:
        orm_mode = True

class PermisoModuloOut(BaseModel):
    idModulo: int
    modulo: str
    ruta: Optional[str]
    funciones: List[FuncionSistemaOut]

class PermisoAgrupado(BaseModel):
    idPerfil: int
    perfil: str
    modulos: List[PermisoModuloOut]