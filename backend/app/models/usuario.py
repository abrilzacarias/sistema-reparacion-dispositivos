from sqlalchemy import Column, Integer, String
from ..database import Base
from sqlalchemy.orm import relationship

class Usuario(Base):
    __tablename__ = "usuario"

    idUsuario = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(45), nullable=False)
    password = Column(String(45), nullable=False)
    email = Column(String(100), nullable=False, unique=True)

    empleados = relationship("Empleado", back_populates="usuario")
    asignacionUsuarioPermisos = relationship('AsignacionUsuarioPermisos', back_populates='usuario')