from sqlalchemy import Column, Integer, String, Date, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class Persona(Base):
    __tablename__ = "persona"

    idPersona = Column(Integer, primary_key=True, index=True, autoincrement=True)
    cuit = Column(String(45), unique=True, nullable=False)
    nombre = Column(String(45), nullable=False)
    apellido = Column(String(45), nullable=False)
    fechaNacimiento = Column(Date, nullable=False)
    estadoPersona = Column(Boolean, nullable=False, default=True)
    
    # Envia a Empleado, Cliente, Domicilio
    empleado = relationship("Empleado", back_populates="persona", uselist=False)
    cliente = relationship("Cliente", back_populates="persona", uselist=False)
    domicilios = relationship("Domicilio", back_populates="persona")
    contactos = relationship("Contacto", back_populates="persona")
