from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base

class TipoDatoPreguntaDiagnostico(Base):
    __tablename__ = 'tipoDatoPreguntaDiagnostico'

    idTipoDatoPreguntaDiagnostico = Column(Integer, primary_key=True, autoincrement=True)
    descripcionTipoDatoPreguntaDiagnostico = Column(String(45), nullable=False, comment='(ej: "texto", "número", "opción", etc.)')

    preguntasDiagnostico = relationship('PreguntaDiagnostico', back_populates='tipoDatoPreguntaDiagnostico')


