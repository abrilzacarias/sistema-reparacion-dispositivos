from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.schemas.estadoReparacion import EstadoReparacionOut
from datetime import date, datetime
from typing import Optional

class RegistroEstadoReparacionCreate(BaseModel):
    idReparacion: int
    idEstadoReparacion: int
    idEmpleado: int

class RegistroEstadoReparacionUpdate(BaseModel):
    idReparacion: int
    idEstadoReparacion: int
    idEmpleado: int
    fechaHoraRegistroEstadoReparacion: datetime

# Persona
class PersonaOut(BaseModel):
    nombre: str
    apellido: str

    class Config:
        orm_mode = True


# Cliente
class ClienteOut(BaseModel):
    persona: PersonaOut

    class Config:
        orm_mode = True


# Marca
class MarcaDispositivoOut(BaseModel):
    descripcionMarcaDispositivo: str

    class Config:
        orm_mode = True


# Tipo
class TipoDispositivoOut(BaseModel):
    nombreTipoDispositivo: str

    class Config:
        orm_mode = True


# Dispositivo
class DispositivoOut(BaseModel):
    modeloDispositivo: str
    descripcionDispositivo: str
    estadoDispositivo: bool
    tipoDispositivo: TipoDispositivoOut
    marcaDispositivo: MarcaDispositivoOut
    cliente: ClienteOut

    class Config:
        orm_mode = True


# Diagnóstico
class DiagnosticoOut(BaseModel):
    dispositivo: DispositivoOut

    class Config:
        orm_mode = True


# Reparación
class ReparacionOut(BaseModel):
    diagnostico: DiagnosticoOut

    class Config:
        orm_mode = True


# EstadoReparacion
class EstadoReparacionOut(BaseModel):
    descripcionEstadoReparacion: str

    class Config:
        orm_mode = True


# Empleado (resumido con persona)
class EmpleadoOut(BaseModel):
    persona: PersonaOut

    class Config:
        orm_mode = True


# RegistroEstadoReparacion completo
class RegistroEstadoReparacionOut(BaseModel):
    idRegistroEstadoReparacion: int
    fechaHoraRegistroEstadoReparacion: datetime
    empleado: EmpleadoOut
    estadoReparacion: EstadoReparacionOut
    reparacion: ReparacionOut

    class Config:
        orm_mode = True
