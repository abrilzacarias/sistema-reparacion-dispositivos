from pydantic import BaseModel, Field
from typing import Optional, List
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
    idPerfil: int
    idmoduloFuncionSistema: int
    estadoPermisoPerfil: int
    moduloFuncionSistema: 'ModuloFuncionSistemaOut'
    # perfil: 'PerfilOut'  

    class Config:
        orm_mode = True

class PermisoModuloOut(BaseModel):
    idModulo: int
    modulo: str
    ruta: Optional[str]
    funciones: List[FuncionSistemaOut]

    class Config:
        orm_mode = True

class RutaFuncionOut(BaseModel):
    idfuncionSistema: int
    descripcionFuncionSistema: str
    ruta: Optional[str]

class PermisoModuloOut(BaseModel):
    idmoduloSistema: int
    descripcionModuloSistema: str
    rutas: List[RutaFuncionOut]
    funciones: List[FuncionSistemaOut]

    class Config:
        allow_population_by_field_name = True
        
class PermisoAgrupado(BaseModel):
    idPerfil: int
    nombrePerfil: str  
    modulos: List[PermisoModuloOut]

    class Config:
        orm_mode = True

