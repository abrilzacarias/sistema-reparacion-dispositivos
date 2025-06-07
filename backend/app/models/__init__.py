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
from .contacto import Contacto
from .tipoContacto import TipoContacto
from .perfil import Perfil
from .funcionSistema import FuncionSistema
from .moduloFuncionSistema import ModuloFuncionSistema
from .moduloSistema import ModuloSistema
from .moduloFuncionSistema import ModuloFuncionSistema
from .permisoPerfil import PermisoPerfil
from .asignacionUsuarioPermisos import AsignacionUsuarioPermisos
from .diagnostico import Diagnostico
from .dispositivo import Dispositivo
from .tipoDispositivo import TipoDispositivo
from .estadoreparacion import EstadoReparacion
from .tiporeparacion import TipoReparacion
from .reparacion import Reparacion
from .detallereparacion import DetalleReparacion
from .notificaciones import Notificacion
from .registroEstadoReparacion import RegistroEstadoReparacion
