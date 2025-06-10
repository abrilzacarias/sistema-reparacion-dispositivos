from pydantic import BaseModel, Field
from typing import Optional, List
from .moduloFuncionSistema import ModuloFuncionSistemaOutCreate
from .funcionSistema import FuncionSistemaOut, FuncionSistemaSimpleOut

class PermisoPerfilBase(BaseModel):
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
    moduloFuncionSistema: 'ModuloFuncionSistemaOutCreate'
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
    funciones: List[FuncionSistemaSimpleOut]

    class Config:
        allow_population_by_field_name = True
        
class PermisoAgrupado(BaseModel):
    idPerfil: int
    nombrePerfil: str  
    modulos: List[PermisoModuloOut]

    class Config:
        orm_mode = True

