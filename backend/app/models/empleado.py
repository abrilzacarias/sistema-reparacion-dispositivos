from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Empleado(Base):
    __tablename__ = "empleado"

    idEmpleado = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fechaContratacion = Column(Date, nullable=False)
    fechaFinalizacion = Column(Date, nullable=True)
    estadoLaboral = Column(String(45), nullable=True)

    idpuestoLaboral = Column(Integer, ForeignKey("puestoLaboral.idpuestoLaboral"), nullable=False)
    idPersona = Column(Integer, ForeignKey("persona.idPersona"), nullable=False)
    idUsuario = Column(Integer, ForeignKey("usuario.idUsuario"), nullable=False)

    puesto = relationship("PuestoLaboral", back_populates="empleados")
    persona = relationship("Persona", back_populates="empleados")
    usuario = relationship("Usuario", back_populates="empleados")
