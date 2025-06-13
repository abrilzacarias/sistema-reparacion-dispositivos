from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.schemas.estadoReparacion import EstadoReparacionOut
from datetime import date, datetime
from typing import Optional
from app.schemas.dispositivo import DispositivoSchema as DispositivoOut

class RegistroEstadoReparacionBase(BaseModel):
    idReparacion: int
    idEstadoReparacion: int
    idEmpleado: int

class RegistroEstadoReparacionCreate(RegistroEstadoReparacionBase):
    pass

class RegistroEstadoReparacionUpdate(BaseModel):
    idEstadoReparacion: Optional[int] = None
    idEmpleado: Optional[int] = None

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

# Empleado (resumido con persona)
class EmpleadoOut(BaseModel):
    persona: PersonaOut

    class Config:
        orm_mode = True

# RegistroEstadoReparacion completo - MANTENER SOLO ESTA DEFINICIÓN
class RegistroEstadoReparacionOut(BaseModel):
    idRegistroEstadoReparacion: int
    idEstadoReparacion: int  # ← Este campo YA está, solo falta en EstadoReparacionOut
    fechaHoraRegistroEstadoReparacion: datetime
    empleado: EmpleadoOut
    estadoReparacion: EstadoReparacionOut  # ← Ahora incluirá el ID también
    reparacion: ReparacionOut

    class Config:
        orm_mode = True
