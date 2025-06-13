from typing import Optional, List
from pydantic import BaseModel

class TipoDatoPreguntaDiagnosticoOut(BaseModel):
    idTipoDatoPreguntaDiagnostico: int
    descripcionTipoDatoPreguntaDiagnostico: str

    class Config:
        orm_mode = True

class PreguntaDiagnosticoBase(BaseModel):
    descripcionPreguntaDiagnostico: str
    idTipoDatoPreguntaDiagnostico: int
    opcionesPregunta: Optional[List[str]] = None  # Mejor tipado que Any

class PreguntaDiagnosticoCreate(PreguntaDiagnosticoBase):
    pass

class PreguntaDiagnosticoUpdate(PreguntaDiagnosticoBase):
    pass

class PreguntaDiagnosticoOut(PreguntaDiagnosticoBase):
    idPreguntaDiagnostico: int
    esObligatoria: bool = True
    tipoDatoPreguntaDiagnostico: Optional[TipoDatoPreguntaDiagnosticoOut] = None

    class Config:
        orm_mode = True
