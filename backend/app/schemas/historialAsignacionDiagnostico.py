from pydantic import BaseModel
from datetime import date
from typing import Optional

class HistorialAsignacionDiagnosticoBase(BaseModel):
    fechaInicioAsignacionDiagnostico: date
    idDiagnostico: int
    idEmpleado: int
    fechaFinAsignacionDiagnostico: Optional[date] = None

class HistorialAsignacionDiagnosticoCreate(HistorialAsignacionDiagnosticoBase):
    pass

class HistorialAsignacionDiagnosticoUpdate(HistorialAsignacionDiagnosticoBase):
    pass

class HistorialAsignacionDiagnosticoOut(HistorialAsignacionDiagnosticoBase):
    idHistorialAsignacionDiagnostico: int

    class Config:
        orm_mode = True
