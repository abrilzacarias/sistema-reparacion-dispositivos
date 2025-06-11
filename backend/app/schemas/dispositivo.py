from pydantic import BaseModel
from typing import Optional


# MarcaDispositivo (mínimo para anidar)
class MarcaDispositivoSchema(BaseModel):
    idMarcaDispositivo: int
    descripcionMarcaDispositivo: str
    estadoMarcaDispositivo: bool

    class Config:
        orm_mode = True


class ModeloDispositivoSchema(BaseModel):
    idModeloDispositivo: int
    descripcionModeloDispositivo: str
    estadoModeloDispositivo: bool
    idMarcaDispositivo: int
    marcaDispositivo: MarcaDispositivoSchema

    class Config:
        orm_mode = True


# TipoDispositivo schema
class TipoDispositivoSchema(BaseModel):
    idTipoDispositivo: int
    nombreTipoDispositivo: str

    class Config:
        orm_mode = True


# Cliente schema
class ClienteSchema(BaseModel):
    idCliente: int
    observaciones: Optional[str] = None

    class Config:
        orm_mode = True


# Base para creación
class DispositivoBase(BaseModel):
    idModeloDispositivo: int
    idTipoDispositivo: int
    idCliente: int


# Create schema (entrada)
class DispositivoCreate(DispositivoBase):
    pass


# Dispositivo schema con relaciones anidadas (salida)
class DispositivoSchema(BaseModel):
    idDispositivo: int
    estadoDispositivo: bool

    idModeloDispositivo: int
    idTipoDispositivo: int
    idCliente: int

    modeloDispositivo: ModeloDispositivoSchema
    tipoDispositivo: TipoDispositivoSchema
    cliente: ClienteSchema

    class Config:
        orm_mode = True
