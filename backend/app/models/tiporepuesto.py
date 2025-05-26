from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base

class TipoRepuesto(Base):
    __tablename__ = "tipoRepuesto"

    idTipoRepuesto = Column(Integer, primary_key=True, index=True)
    descripcionTipoRepuesto = Column(String(80), nullable=False)

    repuestos = relationship("Repuesto", back_populates="tipo")
