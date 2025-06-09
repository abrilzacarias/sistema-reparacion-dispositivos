from pydantic import BaseModel
from typing import Optional, List
from .moduloSistema import ModuloSistemaOut
from .funcionSistema import FuncionSistemaOut

class ModuloFuncionSistemaBase(BaseModel):
    idmoduloSistema: int
    idfuncionSistema: int
    rutaModuloFuncionSistema: Optional[str] = None

class ModuloFuncionSistemaCreate(ModuloFuncionSistemaBase):
    pass

class ModuloFuncionSistemaUpdate(ModuloFuncionSistemaBase):
    pass

class ModuloFuncionSistemaOut(ModuloFuncionSistemaBase):
    idmoduloFuncionSistema: int
    rutaModuloFuncionSistema: Optional[str]

    moduloSistema: ModuloSistemaOut  
    funcionSistema: FuncionSistemaOut
    
    class Config:
        orm_mode = True

class ModuloConFuncionesOut(BaseModel):
    idmoduloSistema: int
    descripcionModuloSistema: str
    funciones: List[FuncionSistemaOut]

    class Config:
        orm_mode = True

class FuncionConModulosOut(BaseModel):
    idfuncionSistema: int
    descripcionFuncionSistema: str
    modulos: List[ModuloSistemaOut] = []

    class Config:
        orm_mode = True