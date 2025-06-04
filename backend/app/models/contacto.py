from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Contacto(Base):
    __tablename__ = "contacto"
    idContacto = Column(Integer, primary_key=True, index=True, autoincrement=True)
    descripcionContacto = Column(String(45), nullable=True)
    idtipoContacto = Column(Integer, ForeignKey("tipoContacto.idtipoContacto"), nullable=False)
    idPersona = Column(Integer, ForeignKey("persona.idPersona"), nullable=False)

    tipoContacto = relationship("TipoContacto", back_populates="contacto")
    persona = relationship("Persona", back_populates="contactos")



