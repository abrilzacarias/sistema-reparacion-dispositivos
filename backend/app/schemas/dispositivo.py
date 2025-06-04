from pydantic import BaseModel
from typing import Optional 



# Base para creación
class DispositivoBase(BaseModel):
    descripcionDispositivo: str
    modeloDispositivo: str
    idMarcaDispositivo: int
    idTipoDispositivo: int
    idCliente: int

# Create schema (entrada)
class DispositivoCreate(DispositivoBase):
    pass

# MarcaDispositivo schema
class MarcaDispositivoSchema(BaseModel):
    idMarcaDispositivo: int
    descripcionMarcaDispositivo: str
    estadoMarcaDispositivo: bool

    class Config:
        orm_mode = True

# TipoDispositivo schema
class TipoDispositivoSchema(BaseModel):
    idTipoDispositivo: int
    nombreTipoDispositivo: str

    class Config:
        orm_mode = True

# Cliente schema (solo con campos relevantes, podés agregar más)
class ClienteSchema(BaseModel):
    idCliente: int
    observaciones: str | None

    class Config:
        orm_mode = True

# Dispositivo schema con anidación
class DispositivoSchema(BaseModel):
    idDispositivo: int
    descripcionDispositivo: str
    modeloDispositivo: str
    estadoDispositivo: bool

    idMarcaDispositivo: int
    idTipoDispositivo: int
    idCliente: int

    marcaDispositivo: MarcaDispositivoSchema
    tipoDispositivo: TipoDispositivoSchema
    cliente: ClienteSchema

    class Config:
        orm_mode = True
