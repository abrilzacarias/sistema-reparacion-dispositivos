from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base

class FuncionSistema(Base):
    __tablename__ = 'funcionSistema'

    idfuncionSistema = mapped_column(Integer, primary_key=True)
    descripcionfuncionSistema = mapped_column(String(45))

    moduloFuncionSistema = relationship('ModuloFuncionSistema', back_populates='funcionSistema')

