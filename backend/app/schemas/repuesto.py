# app/schemas/repuesto.py
from pydantic import BaseModel, Field
from decimal import Decimal
from typing import Optional

class RepuestoBase(BaseModel):
    nombreRepuesto: str = Field(..., example="Pantalla LCD")
    tipoRepuesto: str = Field(..., example="Pantalla")
    precio: Decimal = Field(..., example=2500.50)
    cantidadRepuesto: int = Field(..., example=10)
    idMarcaDispositivo: int = Field(..., example=1)

class RepuestoCreate(RepuestoBase):
    pass

class RepuestoUpdate(RepuestoBase):
    pass

# Schema básico sin referencias circulares
class RepuestoOut(RepuestoBase):
    idRepuesto: int

    class Config:
        from_attributes = True

# Schema para mostrar marca básica (sin repuestos)
class MarcaDispositivoBasic(BaseModel):
    idMarcaDispositivo: int
    descripcionMarcaDispositivo: str

    class Config:
        from_attributes = True

# Schema para repuesto con información de marca (sin crear ciclo)
class RepuestoWithMarca(RepuestoOut):
    marca: Optional[MarcaDispositivoBasic] = None

    class Config:
        from_attributes = True