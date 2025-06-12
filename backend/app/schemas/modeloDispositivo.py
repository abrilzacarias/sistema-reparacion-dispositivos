from pydantic import BaseModel, Field
from typing import Optional

class ModeloDispositivoBase(BaseModel):
    descripcionModeloDispositivo: str = Field(..., example="Galaxy S22")
    idMarcaDispositivo: int

class ModeloDispositivoCreate(ModeloDispositivoBase):
    pass

class ModeloDispositivoUpdate(ModeloDispositivoBase):
    pass

class ModeloDispositivoOut(ModeloDispositivoBase):
    idModeloDispositivo: int
    estadoModeloDispositivo: bool

    class Config:
        from_attributes = True
