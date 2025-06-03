from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text, Column
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base

class TipoContacto(Base):
    __tablename__ = 'tipoContacto'
    idtipoContacto = Column(Integer, primary_key=True, index=True, autoincrement=True)
    descripcionTipoContacto = Column(String(45), nullable=True)

    contacto = relationship('Contacto', back_populates='tipoContacto')

