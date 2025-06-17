# app/schemas/repuesto.py
from pydantic import BaseModel, Field
from decimal import Decimal
from typing import Optional
from app.schemas.tipoRepuesto import TipoRepuestoOut  # importá esto

class RepuestoBase(BaseModel):
    nombreRepuesto: str = Field(..., example="Pantalla LCD")
    precio: Decimal = Field(..., example=2500.50)
    cantidadRepuesto: int = Field(..., example=10)
    idMarcaDispositivo: int = Field(..., example=1)
    idTipoRepuesto: int = Field(..., example=2)
    estadoRepuesto: Optional[bool] = Field(default=True)
    stockMinimo: Optional[int] = Field(None, example=5)  # 👈 agregado

class RepuestoCreate(RepuestoBase):
    pass

class RepuestoUpdate(RepuestoBase):
    pass

class RepuestoOut(RepuestoBase):
    idRepuesto: int

    class Config:
        from_attributes = True

class MarcaDispositivoBasic(BaseModel):
    idMarcaDispositivo: int
    descripcionMarcaDispositivo: str

    class Config:
        from_attributes = True

# Repuesto con datos de Marca y Tipo
class RepuestoWithMarcaTipo(RepuestoOut):
    marca: Optional[MarcaDispositivoBasic] = None
    tipoRepuesto: Optional[TipoRepuestoOut] = Field(None, alias="tipo")

    class Config:
        from_attributes = True
        populate_by_name = True
