from pydantic import BaseModel

class TipoDatoPreguntaDiagnosticoBase(BaseModel):
    descripcionTipoDatoPreguntaDiagnostico: str

class TipoDatoPreguntaDiagnosticoCreate(TipoDatoPreguntaDiagnosticoBase):
    pass

class TipoDatoPreguntaDiagnosticoUpdate(TipoDatoPreguntaDiagnosticoBase):
    pass

class TipoDatoPreguntaDiagnosticoOut(TipoDatoPreguntaDiagnosticoBase):
    idTipoDatoPreguntaDiagnostico: int

    class Config:
        orm_mode = True
