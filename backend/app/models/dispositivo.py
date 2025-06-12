from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class Dispositivo(Base):
    __tablename__ = "dispositivo"

    idDispositivo = Column(Integer, primary_key=True, index=True, autoincrement=True)
    estadoDispositivo = Column(Boolean, default=True, nullable=False)  # tinyint(1) en SQL = Boolean en SQLAlchemy
    # Foreign Keys
    idTipoDispositivo = Column(Integer, ForeignKey('tipoDispositivo.idTipoDispositivo'), nullable=False)
    idCliente = Column(Integer, ForeignKey('cliente.idCliente'), nullable=False)
    idModeloDispositivo = Column(Integer, ForeignKey('modeloDispositivo.idModeloDispositivo'), nullable=False)

    # Relaciones inversas
    tipoDispositivo = relationship("TipoDispositivo", back_populates="dispositivos")
    cliente = relationship("Cliente", back_populates="dispositivos")
    # Relaciones hacia otros modelos
    diagnosticos = relationship("Diagnostico", back_populates="dispositivo")
    modeloDispositivo = relationship("ModeloDispositivo", back_populates="dispositivos")
