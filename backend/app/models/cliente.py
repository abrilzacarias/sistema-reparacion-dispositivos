from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Cliente(Base):
    __tablename__ = "cliente"

    idCliente= Column(Integer, primary_key=True, index=True)
    estadoCliente = Column(String(45), nullable=False)
    observaciones = Column(Date, nullable=True)
    idPersona = Column(Integer, ForeignKey("persona.idPersona"), nullable=False)
    
    persona = relationship("Persona", back_populates="cliente")
    