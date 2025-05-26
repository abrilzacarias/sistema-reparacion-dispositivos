from sqlalchemy import Column, Integer, String, DECIMAL, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class Repuesto(Base):
    __tablename__ = "repuesto"

    idRepuesto = Column(Integer, primary_key=True, index=True)
    nombreRepuesto = Column(String(80), nullable=False)
    precio = Column(DECIMAL, nullable=False)
    cantidadRepuesto = Column(Integer, nullable=False)
    estadoRepuesto = Column(Boolean, default=True, nullable=False)

    idMarcaDispositivo = Column(Integer, ForeignKey("marcaDispositivo.idMarcaDispositivo"), nullable=False)
    idTipoRepuesto = Column(Integer, ForeignKey("tipoRepuesto.idTipoRepuesto"), nullable=False)

    marca = relationship("MarcaDispositivo", back_populates="repuestos")
    tipo = relationship("TipoRepuesto", back_populates="repuestos")

