from pydantic import BaseModel
from typing import List, Optional

class TipoDispositivoBase(BaseModel):
    nombreTipoDispositivo: str

class PreguntaCreate(BaseModel):
    descripcionPreguntaDiagnostico: str
    idTipoDatoPreguntaDiagnostico: int
    opcionesPregunta: Optional[List[str]] = None

class PreguntaUpdate(BaseModel):
    descripcionPreguntaDiagnostico: Optional[str] = None
    idTipoDatoPreguntaDiagnostico: Optional[int] = None
    opcionesPregunta: Optional[List[str]] = None

class TipoDispositivoUpdate(BaseModel):
    nombreTipoDispositivo: Optional[str] = None
    preguntas: Optional[List[PreguntaUpdate]] = None

class TipoDispositivoCreate(BaseModel):
    nombreTipoDispositivo: str
    preguntas: List[PreguntaCreate]

class TipoDispositivoRead(TipoDispositivoBase):
    idTipoDispositivo: int

    class Config:
        orm_mode = True

# --------------------------------
# Agregados para TipoDispositivoOut

class TipoDatoPreguntaDiagnosticoOut(BaseModel):
    idTipoDatoPreguntaDiagnostico: int
    descripcionTipoDatoPreguntaDiagnostico: str

    class Config:
        orm_mode = True

class PreguntaOut(BaseModel):
    idPreguntaDiagnostico: int
    descripcionPreguntaDiagnostico: str
    idTipoDatoPreguntaDiagnostico: int
    tipoDatoPreguntaDiagnostico: Optional[TipoDatoPreguntaDiagnosticoOut] = None
    opcionesPregunta: Optional[List[str]] = None

    class Config:
        orm_mode = True

class TipoDispositivoOut(BaseModel):
    idTipoDispositivo: int
    nombreTipoDispositivo: str
    preguntas: List[PreguntaOut] = []

    class Config:
        orm_mode = True
