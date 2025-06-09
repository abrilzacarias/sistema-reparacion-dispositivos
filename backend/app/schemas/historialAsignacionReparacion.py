from pydantic import BaseModel
from datetime import date
from typing import Optional

class HistorialAsignacionReparacionBase(BaseModel):
    fechaInicioAsignacionReparacion: date
    idReparacion: int
    idEmpleado: int
    fechaFinAsignacionReparacion: Optional[date] = None

class HistorialAsignacionReparacionCreate(HistorialAsignacionReparacionBase):
    pass

class HistorialAsignacionReparacionUpdate(HistorialAsignacionReparacionBase):
    pass

class HistorialAsignacionReparacionOut(HistorialAsignacionReparacionBase):
    idHistorialAsignacionReparacion: int

    class Config:
        orm_mode = True
