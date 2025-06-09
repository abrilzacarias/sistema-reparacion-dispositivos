from pydantic import BaseModel
from .funcionSistema import FuncionSistemaOut
from typing import List

class ModuloSistemaBase(BaseModel):
    idmoduloSistema: int
    descripcionModuloSistema: str

class ModuloSistemaCreate(ModuloSistemaBase):
    pass

class ModuloSistemaUpdate(ModuloSistemaBase):
    pass

class ModuloSistemaOut(BaseModel):
    idmoduloSistema: int
    descripcionModuloSistema: str

    class Config:
        orm_mode = True

class ModuloSistemaFuncionesOut(BaseModel):
    idmoduloSistema: int
    descripcionModuloSistema: str
    funciones: List[FuncionSistemaOut] = []

    class Config:
        orm_mode = True