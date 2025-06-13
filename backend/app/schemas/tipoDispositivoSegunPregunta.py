from pydantic import BaseModel
from typing import Optional
from app.schemas.preguntaDiagnostico import PreguntaDiagnosticoOut  # importá esto

class TipoDispositivoSegunPreguntaBase(BaseModel):
    idTipoDispositivo: int
    idPreguntaDiagnostico: int

class TipoDispositivoSegunPreguntaCreate(TipoDispositivoSegunPreguntaBase):
    idTipoDispositivoSegunPregunta: int

class TipoDispositivoSegunPreguntaUpdate(BaseModel):
    idTipoDispositivo: Optional[int] = None
    idPreguntaDiagnostico: Optional[int] = None

class TipoDispositivoSegunPreguntaResponse(TipoDispositivoSegunPreguntaBase):
    idTipoDispositivoSegunPregunta: int

class TipoDispositivoSegunPreguntaConDetalles(BaseModel):
    idTipoDispositivoSegunPregunta: int
    idTipoDispositivo: int
    idPreguntaDiagnostico: int
    preguntaDiagnostico: Optional[PreguntaDiagnosticoOut] = None
    
    class Config:
        orm_mode = True
