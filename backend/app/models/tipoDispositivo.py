from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class TipoDispositivo(Base):
    __tablename__ = "tipoDispositivo"

    idTipoDispositivo = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombreTipoDispositivo = Column(String(80), nullable=False)
    estadoDispositivo = Column(Boolean, default=True, nullable=False)

    # Relación con dispositivos
    dispositivos = relationship("Dispositivo", back_populates="tipoDispositivo")
    tipoDispositivoSegunPregunta = relationship('TipoDispositivoSegunPregunta', back_populates='tipoDispositivo')

