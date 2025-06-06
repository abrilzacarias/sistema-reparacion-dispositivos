from pydantic import BaseModel

class FuncionSistemaBase(BaseModel):
    idfuncionSistema: int
    descripcionFuncionSistema: str

class FuncionSistemaCreate(FuncionSistemaBase):
    pass

class FuncionSistemaUpdate(FuncionSistemaBase):
    pass

class FuncionSistemaOut(FuncionSistemaBase):
    idfuncionSistema: int

    class Config:
        orm_mode = True
