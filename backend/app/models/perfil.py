from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base

class Perfil(Base):
    __tablename__ = 'perfil'

    idPerfil = mapped_column(Integer, primary_key=True)
    nombrePerfil = mapped_column(String(45))

    permisoPerfil = relationship('PermisoPerfil', back_populates='perfil')

