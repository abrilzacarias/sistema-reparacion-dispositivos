from pydantic import BaseModel, Field
from typing import List

class FuncionSistemaBase(BaseModel):
    idfuncionSistema: int
    descripcionFuncionSistema: str

class FuncionSistemaCreate(FuncionSistemaBase):
    pass

class FuncionSistemaUpdate(FuncionSistemaBase):
    pass

class FuncionSistemaOut(BaseModel):
    idfuncionSistema: int
    descripcionFuncionSistema: str

    class Config:
        orm_mode = True

""" class FuncionConModulosOut(BaseModel):
    idfuncionSistema: int
    descripcionFuncionSistema: str
    modulos: List[ModuloSistemaOut] = []

    class Config:
        orm_mode = True """