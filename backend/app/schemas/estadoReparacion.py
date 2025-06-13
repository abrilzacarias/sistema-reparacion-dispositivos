# schemas/estadoReparacion.py

from pydantic import BaseModel

class EstadoReparacionBase(BaseModel):
    descripcionEstadoReparacion: str

class EstadoReparacionCreate(EstadoReparacionBase):
    pass

class EstadoReparacionUpdate(EstadoReparacionBase):
    pass

class EstadoReparacionOut(EstadoReparacionBase):
    idEstadoReparacion: int
    descripcionEstadoReparacion: str

    class Config:
        orm_mode = True
