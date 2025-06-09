from pydantic import BaseModel
from datetime import date
from typing import Optional

from app.schemas.empleado import EmpleadoOut
from app.schemas.reparacion import ReparacionOut

class HistorialAsignacionReparacionBase(BaseModel):
    fechaInicioAsignacionReparacion: date
    fechaFinAsignacionReparacion: Optional[date] = None
    idEmpleado: int
    idReparacion: int

class HistorialAsignacionReparacionCreate(HistorialAsignacionReparacionBase):
    pass

class HistorialAsignacionReparacionUpdate(BaseModel):
    fechaInicioAsignacionReparacion: Optional[date] = None
    fechaFinAsignacionReparacion: Optional[date] = None
    idEmpleado: Optional[int] = None
    idReparacion: Optional[int] = None

class HistorialAsignacionReparacionOut(HistorialAsignacionReparacionBase):
    idHistorialAsignacionReparacion: int
    empleado: EmpleadoOut
    reparacion: ReparacionOut

    class Config:
        orm_mode = True
