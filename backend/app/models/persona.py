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
    

    empleados = relationship("Empleado", back_populates="persona")
    cliente = relationship("Cliente", back_populates="persona")
    domicilio = relationship("Domicilio", back_populates="persona")