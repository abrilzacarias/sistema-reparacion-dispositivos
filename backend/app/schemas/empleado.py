from pydantic import BaseModel
from datetime import date
from typing import Optional, List

from app.schemas.persona import PersonaOutReduced
from app.schemas.usuario import UsuarioOut
from app.schemas.puestoLaboral import PuestoLaboralOut
from app.schemas.domicilio import DomicilioOut
from app.schemas.contacto import ContactoOut

class EmpleadoBase(BaseModel):
    fechaContratacion: date
    fechaFinalizacion: Optional[date] = None
    idPersona: int
    idUsuario: int
    idpuestoLaboral: int

class EmpleadoCreate(EmpleadoBase):
    perfiles: List[int] = []

class EmpleadoUpdate(BaseModel):
    fechaContratacion: Optional[date] = None
    fechaFinalizacion: Optional[date] = None
    idPersona: Optional[int] = None
    idUsuario: Optional[int] = None
    idpuestoLaboral: Optional[int] = None
    perfiles: Optional[List[int]] = None 

class EmpleadoOut(EmpleadoBase):
    idEmpleado: int
    persona: PersonaOutReduced
    usuario: Optional[UsuarioOut]
    puesto: PuestoLaboralOut

    class Config:
        orm_mode = True

class EmpleadoOutReduced(BaseModel):
    idEmpleado: int
    fechaContratacion: date
    fechaFinalizacion: Optional[date]

    class Config:
        orm_mode = True
