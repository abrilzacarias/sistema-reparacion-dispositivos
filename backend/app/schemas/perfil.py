from pydantic import BaseModel, Field

class PerfilBase(BaseModel):
    nombrePerfil: str = Field(..., example="Administrador")

class PerfilCreate(PerfilBase):
    pass

class PerfilUpdate(PerfilBase):
    pass

class PerfilOut(PerfilBase):
    idPerfil: int
    nombrePerfil: str

    class Config:
        orm_mode = True
