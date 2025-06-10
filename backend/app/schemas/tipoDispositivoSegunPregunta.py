from pydantic import BaseModel
from typing import Optional

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

    class Config:
        orm_mode = True