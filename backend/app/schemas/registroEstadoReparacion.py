from pydantic import BaseModel
from datetime import datetime

class RegistroEstadoReparacionBase(BaseModel):
    idReparacion: int
    idEstadoReparacion: int
    idEmpleado: int
    fechaHoraRegistroEstadoReparacion: datetime

class RegistroEstadoReparacionCreate(RegistroEstadoReparacionBase):
    pass

class RegistroEstadoReparacionUpdate(BaseModel):
    idEstadoReparacion: int
    idEmpleado: int
    fechaHoraRegistroEstadoReparacion: datetime

class RegistroEstadoReparacionOut(BaseModel):
    idRegistroEstadoReparacion: int
    idReparacion: int
    idEstadoReparacion: int
    idEmpleado: int
    fechaHoraRegistroEstadoReparacion: datetime

    class Config:
        orm_mode = True