from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class ModeloDispositivo(Base):
    __tablename__ = "modeloDispositivo"
    idModeloDispositivo = Column(Integer, primary_key=True, index=True)
    descripcionModeloDispositivo = Column(String)
    estadoModeloDispositivo = Column(Boolean)
    idMarcaDispositivo = Column(Integer, ForeignKey("marcaDispositivo.idMarcaDispositivo"))
    
    marcaDispositivo = relationship("MarcaDispositivo", back_populates="modeloDispositivo")

    dispositivos = relationship("Dispositivo", back_populates="modeloDispositivo")