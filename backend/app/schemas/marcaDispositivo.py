# app/schemas/marcaDispositivo.py
from pydantic import BaseModel, Field
from typing import List, Optional

class MarcaDispositivoBase(BaseModel):
    descripcionMarcaDispositivo: str = Field(..., example="Samsung")

class MarcaDispositivoCreate(MarcaDispositivoBase):
    pass

class MarcaDispositivoUpdate(MarcaDispositivoBase):
    pass

# Schema básico sin referencias circulares
class MarcaDispositivoOut(MarcaDispositivoBase):
    idMarcaDispositivo: int
    descripcionMarcaDispositivo: str


    class Config:
        from_attributes = True

# Schema para repuesto básico (sin marca)
class RepuestoBasic(BaseModel):
    idRepuesto: int
    nombreRepuesto: str
    precio: float
    cantidadRepuesto: int
    idMarcaDispositivo: int

    class Config:
        from_attributes = True

# Schema para marca con sus repuestos (sin crear ciclo)
class MarcaDispositivoWithRepuestos(MarcaDispositivoOut):
    repuestos: Optional[List[RepuestoBasic]] = []

    class Config:
        from_attributes = True

