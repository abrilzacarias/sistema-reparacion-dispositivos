from pydantic import BaseModel
from typing import Optional
from datetime import date
from decimal import Decimal
from app.schemas.empleado import EmpleadoOut
from app.schemas.diagnostico import DiagnosticoSchema

class ReparacionBase(BaseModel):
    numeroReparacion: int
    idEstadoReparacion: int
    fechaIngreso: date
    fechaEgreso: Optional[date] = None
    montoTotalReparacion: Decimal
    idDiagnostico: int
    idEmpleado: int

class ReparacionCreate(ReparacionBase):
    pass

class ReparacionUpdate(ReparacionBase):
    pass

class EstadoReparacionSchema(BaseModel):
    idEstadoReparacion: int
    descripcionEstadoReparacion: str

    class Config:
        orm_mode = True



    class Config:
        orm_mode = True



    class Config:
        orm_mode = True

class ReparacionOut(ReparacionBase):
    idReparacion: int
    estadoReparacion: EstadoReparacionSchema
    diagnostico: DiagnosticoSchema
    empleado: EmpleadoOut

    class Config:
        orm_mode = True

