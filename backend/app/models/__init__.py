from sqlalchemy.orm import declarative_base

Base = declarative_base()

# REGISTRAR ACÁ MODELOS
from .persona import Persona
from .empleado import Empleado
from .puestoLaboral import PuestoLaboral
from .usuario import Usuario
from .repuesto import Repuesto
from .marcaDispositivo import MarcaDispositivo
