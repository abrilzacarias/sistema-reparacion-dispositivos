from typing import Optional, List, Any
from pydantic import BaseModel

class PreguntaDiagnosticoBase(BaseModel):
    descripcionPreguntaDiagnostico: str
    idTipoDatoPreguntaDiagnostico: int
    opcionesPregunta: Optional[Any] = None

class PreguntaDiagnosticoCreate(PreguntaDiagnosticoBase):
    pass

class PreguntaDiagnosticoUpdate(PreguntaDiagnosticoBase):
    pass

class PreguntaDiagnosticoOut(PreguntaDiagnosticoBase):
    idPreguntaDiagnostico: int

    class Config:
        orm_mode = True