from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class TipoDomicilio(Base):
    __tablename__ = "tipoDomicilio"
    idtipoDomicilio = Column(Integer, primary_key=True, autoincrement=True)
    descripciontipoDomicilio = Column(String(45), nullable=False)

    domicilio = relationship("Domicilio", back_populates="tipoDomicilio")