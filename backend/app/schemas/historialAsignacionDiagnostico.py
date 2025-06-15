from pydantic import BaseModel
from datetime import date
from typing import Optional
from app.schemas.empleado import EmpleadoOut

class HistorialAsignacionDiagnosticoBase(BaseModel):
    fechaInicioAsignacionDiagnostico: date
    idDiagnostico: int
    idEmpleado: int
    fechaFinAsignacionDiagnostico: Optional[date] = None

class HistorialAsignacionDiagnosticoCreate(HistorialAsignacionDiagnosticoBase):
    fechaInicioAsignacionDiagnostico: date
    fechaFinAsignacionDiagnostico: Optional[date] = None  # ✅ ahora permite None
    idDiagnostico: int
    idEmpleado: int

class HistorialAsignacionDiagnosticoUpdate(HistorialAsignacionDiagnosticoBase):
    pass

class HistorialAsignacionDiagnosticoOut(HistorialAsignacionDiagnosticoBase):
    idHistorialAsignacionDiagnostico: int
    empleado: EmpleadoOut

    class Config:
        orm_mode = True
