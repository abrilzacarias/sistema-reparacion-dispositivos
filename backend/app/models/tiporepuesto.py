from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base

class TipoRepuesto(Base):
    __tablename__ = 'tipoRepuesto'

    idTipoRepuesto = mapped_column(Integer, primary_key=True)
    descripcionTipoRespuesto = mapped_column(String(80))

    repuesto = relationship('Repuesto', back_populates='tipoRepuesto_')

