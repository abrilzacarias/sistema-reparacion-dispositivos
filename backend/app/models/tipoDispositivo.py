from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base

class TipoDispositivo(Base):
    __tablename__ = "tipoDispositivo"

    idTipoDispositivo = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombreTipoDispositivo = Column(String(80), nullable=False)

    # Relación con dispositivos
    dispositivos = relationship("Dispositivo", back_populates="tipoDispositivo")
