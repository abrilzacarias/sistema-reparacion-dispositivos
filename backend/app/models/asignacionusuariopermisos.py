from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
import datetime
import decimal
from app.database import Base

class AsignacionUsuarioPermisos(Base):
    __tablename__ = 'asignacionUsuarioPermisos'
    __table_args__ = (
        ForeignKeyConstraint(['idUsuario'], ['usuario.idUsuario'], name='fk_asignacionUsuarioPermisos_usuarios1'),
        ForeignKeyConstraint(['idpermisoPerfil'], ['permisoPerfil.idpermisoPerfil'], name='fk_asignacionUsuarioPermisos_permisosDePerfiles1'),
        Index('fk_asignacionUsuarioPermisos_permisosDePerfiles1_idx', 'idpermisoPerfil'),
        Index('fk_asignacionUsuarioPermisos_usuarios1_idx', 'idUsuario')
    )

    idasignacionUsuarioPermisos = mapped_column(Integer, primary_key=True)
    idUsuario = mapped_column(Integer)
    idpermisoPerfil = mapped_column(Integer)

    usuario = relationship('Usuario', back_populates='asignacionUsuarioPermisos')
    permisoPerfil = relationship('PermisoPerfil', back_populates='asignacionUsuarioPermisos')

