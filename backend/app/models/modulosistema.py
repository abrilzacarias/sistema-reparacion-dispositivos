from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base

class ModuloSistema(Base):
    __tablename__ = 'moduloSistema'

    idmoduloSistema = mapped_column(Integer, primary_key=True)
    descripcionmoduloSistema = mapped_column(String(45))

    moduloFuncionSistema = relationship('ModuloFuncionSistema', back_populates='moduloSistema')

