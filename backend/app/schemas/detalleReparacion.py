from pydantic import BaseModel
from typing import Optional
from decimal import Decimal
from datetime import date

class DetalleReparacionBase(BaseModel):
    montoTotalDetalleReparacion: Optional[Decimal] = None
    manoObra: Decimal
    precioRepuesto: Decimal
    descripcion: Optional[str] = None
    idReparacion: int
    idTipoReparacion: int
    idRepuesto: int

class DetalleReparacionCreate(DetalleReparacionBase):
    pass

class DetalleReparacionUpdate(BaseModel):
    montoTotalDetalleReparacion: Optional[Decimal] = None
    manoObra: Optional[Decimal] = None
    precioRepuesto: Optional[Decimal] = None
    descripcion: Optional[str] = None
    idReparacion: Optional[int] = None
    idTipoReparacion: Optional[int] = None
    idRepuesto: Optional[int] = None

# Schemas simples para relaciones anidadas (podés extender según necesidad)
class ReparacionSchema(BaseModel):
    idReparacion: int
    numeroReparacion: int
    fechaIngreso: date
    montoTotalReparacion: Decimal
    fechaEgreso: Optional[date] = None

    class Config:
        orm_mode = True

class RepuestoSchema(BaseModel):
    idRepuesto: int
    nombreRepuesto: str
    precio: Decimal
    cantidadRepuesto: int
    estadoRepuesto: bool

    class Config:
        orm_mode = True

class TipoReparacionSchema(BaseModel):
    idTipoReparacion: int
    descripcionTipoReparacion: str

    class Config:
        orm_mode = True

class DetalleReparacionOut(DetalleReparacionBase):
    idDetalleReparacion: int
    reparacion: ReparacionSchema
    repuesto: RepuestoSchema
    tipoReparacion: TipoReparacionSchema

    class Config:
        orm_mode = True
