from pydantic import BaseModel, Field
from typing import Optional
from app.schemas.marcaDispositivo import MarcaDispositivoOut

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
    marcaDispositivo: Optional[MarcaDispositivoOut]  # <-- agregá la marca como opcional

    class Config:
        from_attributes = True
