from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class ModeloDispositivo(Base):
    __tablename__ = "modeloDispositivo"

    idModeloDispositivo = Column(Integer, primary_key=True, autoincrement=True)
    descripcionModeloDispositivo = Column(String(45), nullable=False)
    estadoModeloDispositivo = Column(Boolean, default=True, nullable=False)
    idMarcaDispositivo = Column(Integer, ForeignKey("marcaDispositivo.idMarcaDispositivo"), nullable=False)

    marcaDispositivo = relationship("MarcaDispositivo", back_populates="modeloDispositivo")
    dispositivos = relationship("Dispositivo", back_populates="modeloDispositivo")
