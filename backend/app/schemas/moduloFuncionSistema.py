from pydantic import BaseModel
from typing import Optional
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
    idmoduloSistema: int
    idfuncionSistema: int
    rutaModuloFuncionSistema: Optional[str]

    moduloSistema: ModuloSistemaOut  
    funcionSistema: FuncionSistemaOut
    
    class Config:
        orm_mode = True
