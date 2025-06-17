from pydantic import BaseModel, Field
from typing import Optional
from app.schemas.marcaDispositivo import MarcaDispositivoOut
from app.schemas.tipoDispositivo import TipoDispositivoBase

class ModeloDispositivoBase(BaseModel):
    descripcionModeloDispositivo: str = Field(..., example="Galaxy S22")
    idMarcaDispositivo: int
    idTipoDispositivo: int  # <-- Agregado

class ModeloDispositivoCreate(ModeloDispositivoBase):
    estadoModeloDispositivo: Optional[bool] = True

class ModeloDispositivoUpdate(ModeloDispositivoBase):
    pass

class ModeloDispositivoOut(ModeloDispositivoBase):
    idModeloDispositivo: int
    estadoModeloDispositivo: bool
    marcaDispositivo: Optional[MarcaDispositivoOut]  # <-- agregá la marca como opcional
    tipoDispositivo: Optional[TipoDispositivoBase]  # ✅ hacerlo opcional

    class Config:
        from_attributes = True
