from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base

class ModuloFuncionSistema(Base):
    __tablename__ = 'moduloFuncionSistema'
    __table_args__ = (
        ForeignKeyConstraint(['idfuncionSistema'], ['funcionSistema.idfuncionSistema'], name='fk_moduloFuncionSistema_funcionSistema1'),
        ForeignKeyConstraint(['idmoduloSistema'], ['moduloSistema.idmoduloSistema'], name='fk_moduloFuncionSistema_moduloSistema1'),
        Index('fk_moduloFuncionSistema_funcionSistema1_idx', 'idfuncionSistema'),
        Index('fk_moduloFuncionSistema_moduloSistema1_idx', 'idmoduloSistema')
    )

    idmoduloFuncionSistema = mapped_column(Integer, primary_key=True)
    idmoduloSistema = mapped_column(Integer)
    idfuncionSistema = mapped_column(Integer)
    rutaModuloFuncionSistema = mapped_column(String(45))

    funcionSistema = relationship('FuncionSistema', back_populates='moduloFuncionSistema')
    moduloSistema = relationship('ModuloSistema', back_populates='moduloFuncionSistema')
    permisoPerfil = relationship('PermisoPerfil', back_populates='moduloFuncionSistema')

