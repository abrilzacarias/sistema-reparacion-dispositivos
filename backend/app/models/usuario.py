from sqlalchemy import Column, Integer, String, Boolean
from ..database import Base
from sqlalchemy.orm import relationship

class Usuario(Base):
    __tablename__ = "usuario"

    idUsuario = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(45), nullable=False)
    password = Column(String(255), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    needs_password_change = Column(Boolean, nullable=False, default=True)

    empleados = relationship("Empleado", back_populates="usuario")
    asignacionUsuarioPermisos = relationship('AsignacionUsuarioPermisos', back_populates='usuario')

    @property
    def perfiles(self):
        perfiles = set()
        for asignacion in self.asignacionUsuarioPermisos:
            permiso = asignacion.permisoPerfil
            if permiso and permiso.perfil:
                perfiles.add(permiso.perfil)
        return list(perfiles)