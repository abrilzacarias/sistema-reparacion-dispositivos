from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date
from decimal import Decimal
from app.schemas.empleado import EmpleadoOut
from app.schemas.diagnostico import DiagnosticoSchema
from app.schemas.registroEstadoReparacion import RegistroEstadoReparacionOut


class ReparacionBase(BaseModel):
    fechaIngreso: datetime
    fechaEgreso: Optional[datetime] = None
    montoTotalReparacion: Optional[Decimal] = None
    idDiagnostico: int
    idEmpleado: Optional[int] = None

class ReparacionCreate(ReparacionBase):
    pass

class ReparacionUpdate(ReparacionBase):
    # Nuevos campos para registrar el estado de la reparación
    idEstadoReparacion: Optional[int] = None
    idEmpleadoEstado: Optional[int] = None  # para guardar quién registró el estado

class ReparacionOut(ReparacionBase):
    idReparacion: int
    diagnostico: DiagnosticoSchema
    empleado: Optional[EmpleadoOut] = None
    registroEstadoReparacion: List[RegistroEstadoReparacionOut]

    class Config:
        orm_mode = True

