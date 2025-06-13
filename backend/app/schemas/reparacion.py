from pydantic import BaseModel
from typing import Optional, List
from datetime import date
from decimal import Decimal
from app.schemas.empleado import EmpleadoOut
from app.schemas.diagnostico import DiagnosticoSchema
from app.schemas.registroEstadoReparacion import RegistroEstadoReparacionOut


class ReparacionBase(BaseModel):
    fechaIngreso: date
    fechaEgreso: Optional[date] = None
    montoTotalReparacion: Optional[Decimal] = None
    idDiagnostico: int
    idEmpleado: int

class ReparacionCreate(ReparacionBase):
    pass

class ReparacionUpdate(ReparacionBase):
    # Nuevos campos para registrar el estado de la reparación
    idEstadoReparacion: Optional[int] = None
    idEmpleadoEstado: Optional[int] = None  # para guardar quién registró el estado

class ReparacionOut(ReparacionBase):
    idReparacion: int
    diagnostico: DiagnosticoSchema
    empleado: EmpleadoOut
    registroEstadoReparacion: List[RegistroEstadoReparacionOut]

    class Config:
        orm_mode = True

