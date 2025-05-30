from sqlalchemy.orm import declarative_base

Base = declarative_base()

# REGISTRAR ACÁ MODELOS
from .persona import Persona
from .empleado import Empleado
from .puestoLaboral import PuestoLaboral
from .usuario import Usuario
from .tipoRepuesto import TipoRepuesto
from .repuesto import Repuesto
from .marcaDispositivo import MarcaDispositivo
from .cliente import Cliente
from .domicilio import Domicilio
from .tipoDomicilio import TipoDomicilio
from .perfil import Perfil


from .diagnostico import Diagnostico
from .dispositivo import Dispositivo
from .tipoDispositivo import TipoDispositivo

