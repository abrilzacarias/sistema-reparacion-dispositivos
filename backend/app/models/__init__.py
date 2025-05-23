from sqlalchemy.orm import declarative_base

Base = declarative_base()

# REGISTRAR ACÁ MODELOS
from .persona import Persona
from .empleado import Empleado
from .puestoLaboral import PuestoLaboral
from .usuario import Usuario
from .cliente import Cliente
from .domicilio import Domicilio
from .tipoDomicilio import TipoDomicilio

