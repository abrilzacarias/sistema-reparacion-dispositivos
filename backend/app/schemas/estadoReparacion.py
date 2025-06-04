from pydantic import BaseModel, Field

class EstadoReparacionBase(BaseModel):
    descripcionEstadoReparacion: str = Field(..., example="En proceso")

class EstadoReparacionCreate(EstadoReparacionBase):
    pass

class EstadoReparacionUpdate(EstadoReparacionBase):
    pass

class EstadoReparacionOut(EstadoReparacionBase):
    idEstadoReparacion: int

    class Config:
        from_attributes = True
