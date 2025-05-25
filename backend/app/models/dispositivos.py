from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Dispositivo(Base):
    __tablename__ = "dispositivo"

    idDispositivo = Column(Integer, primary_key=True, index=True)
    descripcionDispositivo = Column(String(80), nullable=False)
    modeloDispositivo = Column(String(45), nullable=False)

    # Relaciones
    idMarcaDispositivo = Column(Integer, ForeignKey('marcaDispositivo.idMarcaDispositivo'))
    marcaDispositivo = relationship("MarcaDispositivo", back_populates="dispositivo")
    
    idTipoDispositivo = Column(Integer, ForeignKey('tipoDispositivo.idTipoDispositivo'))
    tipoDispositivo = relationship("TipoDispositivo", back_populates="dispositivo")
    
    idCliente = Column(Integer, ForeignKey('cliente.idCliente'))
    cliente = relationship("Cliente", back_populates="dispositivo")
    
    diagnostico = relationship("Diagnostico", back_populates="dispositivo")