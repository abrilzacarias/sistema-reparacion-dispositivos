from pydantic import BaseModel
from typing import Optional, List
from app.schemas.preguntaDiagnostico import PreguntaDiagnosticoOut  # importá esto
from app.schemas.tipoDispositivo import TipoDispositivoRead

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

class TipoDispositivoAgrupadoSchema(BaseModel):
    tipoDispositivo: TipoDispositivoRead
    preguntas: List[str]


class TipoDispositivoSegunPreguntaConDetalles(BaseModel):
    idTipoDispositivoSegunPregunta: int
    idTipoDispositivo: int
    idPreguntaDiagnostico: int
    preguntaDiagnostico: Optional[PreguntaDiagnosticoOut] = None
    tipoDispositivo: Optional[TipoDispositivoRead] = None  # Acá incluís el objeto completo
    
    class Config:
        orm_mode = True
