from pydantic import BaseModel

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
