from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base

class TipoReparacion(Base):
    __tablename__ = 'tipoReparacion'

    idTipoReparacion = mapped_column(Integer, primary_key=True)
    descripcionTipoReparacion = mapped_column(String(80))

    detalleReparacion = relationship('DetalleReparacion', back_populates='tipoReparacion')

