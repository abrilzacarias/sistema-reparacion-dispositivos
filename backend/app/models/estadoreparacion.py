from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base

class EstadoReparacion(Base):
    __tablename__ = 'estadoReparacion'

    idEstadoReparacion = mapped_column(Integer, primary_key=True)
    descripcionEstadoReparacion = mapped_column(String(70))

    #reparaciones = relationship('Reparacion', back_populates='estadoReparacion')
    registroEstadoReparacion = relationship("RegistroEstadoReparacion", back_populates="estadoReparacion")


