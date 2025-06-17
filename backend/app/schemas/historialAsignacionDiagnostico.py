from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.schemas.empleado import EmpleadoOut

class HistorialAsignacionDiagnosticoBase(BaseModel):
    fechaInicioAsignacionDiagnostico: datetime
    idDiagnostico: int
    idEmpleado: int
    fechaFinAsignacionDiagnostico: Optional[datetime] = None

class HistorialAsignacionDiagnosticoCreate(HistorialAsignacionDiagnosticoBase):
    fechaInicioAsignacionDiagnostico: datetime  # <- datetime, no date
    fechaFinAsignacionDiagnostico: Optional[datetime] = None
    idDiagnostico: int
    idEmpleado: int

class HistorialAsignacionDiagnosticoUpdate(HistorialAsignacionDiagnosticoBase):
    pass

class HistorialAsignacionDiagnosticoOut(HistorialAsignacionDiagnosticoBase):
    idHistorialAsignacionDiagnostico: int
    empleado: EmpleadoOut

    class Config:
        orm_mode = True
