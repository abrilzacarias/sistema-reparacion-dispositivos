from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base
from app.models.asignacionUsuarioPermisos import AsignacionUsuarioPermisos

class PermisoPerfil(Base):
    __tablename__ = 'permisoPerfil'
    __table_args__ = (
        ForeignKeyConstraint(['idPerfil'], ['perfil.idPerfil'], name='fk_permisosDePerfiles_perfiles1'),
        ForeignKeyConstraint(['idmoduloFuncionSistema'], ['moduloFuncionSistema.idmoduloFuncionSistema'], name='fk_permisoPerfil_moduloFuncionSistema1'),
        Index('fk_permisoPerfil_moduloFuncionSistema1_idx', 'idmoduloFuncionSistema'),
        Index('fk_permisosDePerfiles_perfiles1_idx', 'idPerfil')
    )

    idpermisoPerfil = mapped_column(Integer, primary_key=True)
    idPerfil = mapped_column(Integer)
    estadoPermisoPerfil = mapped_column(TINYINT, server_default=text("'1'"))
    idmoduloFuncionSistema = mapped_column(Integer)

    perfil = relationship('Perfil', back_populates='permisoPerfil')
    moduloFuncionSistema = relationship('ModuloFuncionSistema', back_populates='permisoPerfil')
    asignacionUsuarioPermisos = relationship(AsignacionUsuarioPermisos, back_populates='permisoPerfil')

