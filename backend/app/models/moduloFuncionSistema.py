from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base
from app.models.moduloSistema import ModuloSistema
from app.models.funcionSistema import FuncionSistema
from app.models.permisoPerfil import PermisoPerfil

class ModuloFuncionSistema(Base):
    __tablename__ = 'moduloFuncionSistema'
    __table_args__ = (
        ForeignKeyConstraint(['idfuncionSistema'], ['funcionSistema.idfuncionSistema'], name='fk_moduloFuncionSistema_funcionSistema1'),
        ForeignKeyConstraint(['idmoduloSistema'], ['moduloSistema.idmoduloSistema'], name='fk_moduloFuncionSistema_moduloSistema1'),
        Index('fk_moduloFuncionSistema_funcionSistema1_idx', 'idfuncionSistema'),
        Index('fk_moduloFuncionSistema_moduloSistema1_idx', 'idmoduloSistema')
    )

    idmoduloFuncionSistema: Mapped[int] = mapped_column(Integer, primary_key=True)
    idmoduloSistema: Mapped[int] = mapped_column(Integer, nullable=False)
    idfuncionSistema: Mapped[int] = mapped_column(Integer, nullable=False)
    rutaModuloFuncionSistema: Mapped[Optional[str]] = mapped_column(String(45))
    estadoModuloFuncionSistema = mapped_column(TINYINT, server_default=text("'1'"))

    funcionSistema = relationship('FuncionSistema', back_populates='moduloFuncionSistema')
    moduloSistema = relationship('ModuloSistema', back_populates='moduloFuncionSistema')
    permisoPerfil = relationship('PermisoPerfil', cascade="all, delete-orphan", back_populates='moduloFuncionSistema')


