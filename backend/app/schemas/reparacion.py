from pydantic import BaseModel
from typing import Optional
from datetime import date
from decimal import Decimal

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

class EmpleadoSchema(BaseModel):
    idEmpleado: int

    class Config:
        orm_mode = True

class DiagnosticoSchema(BaseModel):
    idDiagnostico: int
    fechaDiagnostico: date
    idDispositivo: int
    idEmpleado: int

    class Config:
        orm_mode = True

class ReparacionOut(ReparacionBase):
    idReparacion: int
    estadoReparacion: EstadoReparacionSchema
    diagnostico: DiagnosticoSchema
    empleado: EmpleadoSchema

    class Config:
        orm_mode = True

