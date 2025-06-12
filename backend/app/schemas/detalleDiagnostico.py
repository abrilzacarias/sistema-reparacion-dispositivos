from typing import Optional
from pydantic import BaseModel

class DetalleDiagnosticoBase(BaseModel):
    valorDiagnostico: str
    idDiagnostico: int
    idTipoDispositivoSegunPregunta: int

class DetalleDiagnosticoCreate(BaseModel):
    valorDiagnostico: str
    idDiagnostico: int   
    idTipoDispositivoSegunPregunta: int

class DetalleDiagnosticoUpdate(DetalleDiagnosticoBase):
    pass

class DetalleDiagnosticoOut(DetalleDiagnosticoBase):
    idDetalleDiagnostico: int

    class Config:
        orm_mode = True
