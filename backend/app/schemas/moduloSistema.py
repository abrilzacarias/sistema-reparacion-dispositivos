from pydantic import BaseModel

class ModuloSistemaBase(BaseModel):
    idmoduloSistema: int
    descripcionModuloSistema: str

class ModuloSistemaCreate(ModuloSistemaBase):
    pass

class ModuloSistemaUpdate(ModuloSistemaBase):
    pass

class ModuloSistemaOut(ModuloSistemaBase):
    idmoduloSistema: int

    class Config:
        orm_mode = True
