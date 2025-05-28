from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base

class TipoContacto(Base):
    __tablename__ = 'tipoContacto'

    idtipoContacto = mapped_column(Integer, primary_key=True)
    descripciontipoContacto = mapped_column(String(45))

    contacto = relationship('Contacto', back_populates='tipoContacto')

