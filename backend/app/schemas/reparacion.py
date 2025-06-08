from pydantic import BaseModel
from typing import Optional, List
from datetime import date
from decimal import Decimal
from app.schemas.empleado import EmpleadoOut
from app.schemas.diagnostico import DiagnosticoSchema
from app.schemas.registroEstadoReparacion import RegistroEstadoReparacionOut


class ReparacionBase(BaseModel):
    #numeroReparacion: int
    fechaIngreso: date
    fechaEgreso: Optional[date] = None
    montoTotalReparacion: Optional[Decimal] = None
    idDiagnostico: int
    idEmpleado: int

class ReparacionCreate(ReparacionBase):
    pass

class ReparacionUpdate(ReparacionBase):
    pass

class ReparacionOut(ReparacionBase):
    idReparacion: int
    diagnostico: DiagnosticoSchema
    empleado: EmpleadoOut
    registroEstadoReparacion: list[RegistroEstadoReparacionOut]

    class Config:
        orm_mode = True

