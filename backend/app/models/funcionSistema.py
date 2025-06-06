from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text, Column, Boolean
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base

class FuncionSistema(Base):
    __tablename__ = 'funcionSistema'

    idfuncionSistema = Column(Integer, primary_key=True, index=True, autoincrement=True)
    descripcionFuncionSistema = Column(String(45), nullable=False)
    estadoFuncionSistema = Column(Boolean, nullable=False, default=True)

    moduloFuncionSistema = relationship('ModuloFuncionSistema', back_populates='funcionSistema')


