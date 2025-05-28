from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base

class TipoDatoPreguntaDiagnostico(Base):
    __tablename__ = 'tipoDatoPreguntaDiagnostico'

    idTipoDatoPreguntaDiagnostico = mapped_column(Integer, primary_key=True)
    descripcionTipoDatoPreguntaDiagnostico = mapped_column(String(45), comment='(ej: "texto", "nÃºmero", "opciÃ³n", etc.)')

    preguntaDiagnostico = relationship('PreguntaDiagnostico', back_populates='tipoDatoPreguntaDiagnostico')

