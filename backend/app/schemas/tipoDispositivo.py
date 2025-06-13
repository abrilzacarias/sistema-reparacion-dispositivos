from pydantic import BaseModel
from typing import List, Optional

class TipoDispositivoBase(BaseModel):
    nombreTipoDispositivo: str

class PreguntaCreate(BaseModel):
    descripcionPreguntaDiagnostico: str
    idTipoDatoPreguntaDiagnostico: int
    opcionesPregunta: Optional[List[str]] = None

class TipoDispositivoCreate(BaseModel):
    nombreTipoDispositivo: str
    preguntas: List[PreguntaCreate]

class TipoDispositivoRead(TipoDispositivoBase):
    idTipoDispositivo: int

    class Config:
        orm_mode = True
