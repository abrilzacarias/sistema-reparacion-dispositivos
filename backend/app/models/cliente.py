from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Cliente(Base):
    __tablename__ = "cliente"

    idCliente = Column(Integer, primary_key=True, index=True, autoincrement=True)
    observaciones = Column(Text, nullable=True)  # ← Tipo cambiado a Text
    idPersona = Column(Integer, ForeignKey("persona.idPersona"), nullable=False)
    
    persona = relationship("Persona", back_populates="cliente")
