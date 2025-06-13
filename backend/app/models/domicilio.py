from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Domicilio(Base):
    __tablename__ = "domicilio"
    idDomicilio = Column(Integer, primary_key=True, index=True, autoincrement=True)
    codigoPostal = Column(String(45), nullable=True)
    pais = Column(String(45), nullable=True)
    provincia = Column(String(45), nullable=True)
    ciudad = Column(String(45), nullable=True)
    barrio = Column(String(45), nullable=True)
    calle = Column(String(45), nullable=True)
    numero = Column(String(45), nullable=True)
    departamento = Column(String(45), nullable=True)
    idtipoDomicilio = Column(Integer, ForeignKey("tipoDomicilio.idtipoDomicilio"), nullable=False)
    idPersona = Column(Integer, ForeignKey("persona.idPersona"), nullable=False)

    tipoDomicilio = relationship("TipoDomicilio", back_populates="domicilio")
    persona = relationship("Persona", back_populates="domicilios")


