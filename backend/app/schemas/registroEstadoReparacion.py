from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.schemas.estadoReparacion import EstadoReparacionOut

class RegistroEstadoReparacionBase(BaseModel):
    idReparacion: int
    idEstadoReparacion: int
    idEmpleado: int

class RegistroEstadoReparacionCreate(RegistroEstadoReparacionBase):
    # fechaHoraRegistroEstadoReparacion se genera automáticamente en el backend
    pass

class RegistroEstadoReparacionUpdate(BaseModel):
    idEstadoReparacion: Optional[int] = None
    idEmpleado: Optional[int] = None
    # No permitir actualizar la fecha de registro original

class RegistroEstadoReparacionOut(BaseModel):
    idRegistroEstadoReparacion: int
    idReparacion: int
    idEstadoReparacion: int
    idEmpleado: int
    fechaHoraRegistroEstadoReparacion: datetime
    estadoReparacion: EstadoReparacionOut

    class Config:
        orm_mode = True