from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class MarcaDispositivo(Base):
    __tablename__ = "marcaDispositivo"

    idMarcaDispositivo = Column(Integer, primary_key=True, index=True, autoincrement=True)
    descripcionMarcaDispositivo = Column(String(45), nullable=False)
    estadoMarcaDispositivo = Column(Boolean, default=True, nullable=False)  

    # Envia a Repuesto, Dispositivo
    repuestos = relationship("Repuesto", back_populates="marca")
    dispositivos = relationship("Dispositivo", back_populates="marcaDispositivo")