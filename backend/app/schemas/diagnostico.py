from datetime import date
from pydantic import BaseModel
from typing import Optional, List
from app.schemas.modeloDispositivo import ModeloDispositivoOut

# PAra llegar a Diagnostico, debo ingresar:
# persona
class PersonaSchema(BaseModel):
    idPersona: int
    nombre: str
    apellido: str

    class Config:
        orm_mode = True

# cliente
class ClienteSchema(BaseModel):
    idCliente: int
    persona: PersonaSchema

    class Config:
        orm_mode = True

# empleado
class EmpleadoSchema(BaseModel):
    idEmpleado: int
    persona: PersonaSchema

    class Config:
        orm_mode = True

# marcaDispositivo
class MarcaDispositivoSchema(BaseModel):
    idMarcaDispositivo: int
    descripcionMarcaDispositivo: str

    class Config:
        orm_mode = True

# tipoDispositivo
class TipoDispositivoSchema(BaseModel):
    idTipoDispositivo: int
    nombreTipoDispositivo: str

    class Config:
        orm_mode = True

# Dispositivo
class DispositivoSchema(BaseModel):
    idDispositivo: int
    modeloDispositivo: ModeloDispositivoOut  
    tipoDispositivo: TipoDispositivoSchema
    cliente: ClienteSchema

    class Config:
        orm_mode = True

# VAMO Diagnóstico
class DiagnosticoSchema(BaseModel):
    idDiagnostico: int
    fechaDiagnostico: date
    dispositivo: DispositivoSchema
    empleado: EmpleadoSchema

    class Config:
        orm_mode = True

# Schemas para Diagnóstico
class DiagnosticoBase(BaseModel):
    fechaDiagnostico: date
    idDispositivo: int
    idEmpleado: int

class DiagnosticoCreate(DiagnosticoBase):
    pass

class DiagnosticoUpdate(BaseModel):
    fechaDiagnostico: Optional[date] = None
    idDispositivo: Optional[int] = None
    idEmpleado: Optional[int] = None

class DiagnosticoSchema(DiagnosticoBase):
    idDiagnostico: int
    dispositivo: DispositivoSchema
    empleado: EmpleadoSchema

    class Config:
        orm_mode = True