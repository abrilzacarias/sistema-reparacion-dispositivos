from pydantic import BaseModel

class TipoReparacionBase(BaseModel):
    descripcionTipoReparacion: str

class TipoReparacionCreate(TipoReparacionBase):
    pass

class TipoReparacionUpdate(TipoReparacionBase):
    pass

class TipoReparacionOut(TipoReparacionBase):
    idTipoReparacion: int

    class Config:
        orm_mode = True
