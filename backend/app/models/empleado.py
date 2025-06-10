from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Empleado(Base):
    __tablename__ = "empleado"

    idEmpleado = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fechaContratacion = Column(Date, nullable=False)
    fechaFinalizacion = Column(Date, nullable=True)

    # Recibe de PuestoLaboral, Persona, Usuario
    idpuestoLaboral = Column(Integer, ForeignKey("puestoLaboral.idpuestoLaboral"), nullable=False)
    puesto = relationship("PuestoLaboral", back_populates="empleados")
    
    idPersona = Column(Integer, ForeignKey("persona.idPersona"), nullable=False)
    persona = relationship("Persona", back_populates="empleado")
    
    idUsuario = Column(Integer, ForeignKey("usuario.idUsuario"), nullable=False)
    usuario = relationship("Usuario", back_populates="empleados")
    
    # Envia a Diagnostico
    diagnosticos = relationship("Diagnostico", back_populates="empleado")
    reparaciones = relationship("Reparacion", back_populates="empleado")
    registroEstadoReparacion = relationship("RegistroEstadoReparacion", back_populates="empleado")
    historialAsignacionReparacion = relationship('HistorialAsignacionReparacion', back_populates='empleado')
    historialAsignacionDiagnostico = relationship('HistorialAsignacionDiagnostico', back_populates='empleado')


