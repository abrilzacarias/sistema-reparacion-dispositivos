from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text, Column, Boolean
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base

class ModuloSistema(Base):
    __tablename__ = 'moduloSistema'


    idmoduloSistema = Column(Integer, primary_key=True, index=True, autoincrement=True)
    descripcionModuloSistema = Column(String(45), nullable=False)
    estadoModuloSistema = Column(Boolean, nullable=False, default=True)

    moduloFuncionSistema = relationship('ModuloFuncionSistema', back_populates='moduloSistema')
