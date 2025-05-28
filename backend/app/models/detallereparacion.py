from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base
import decimal

class DetalleReparacion(Base):
    __tablename__ = 'detalleReparacion'
    __table_args__ = (
        ForeignKeyConstraint(['idReparacion'], ['reparacion.idReparacion'], name='fk_detalleReparacion_reparacion1'),
        ForeignKeyConstraint(['idRepuesto'], ['repuesto.idRepuesto'], name='fk_detalleReparacion_repuestos1'),
        ForeignKeyConstraint(['idTipoReparacion'], ['tipoReparacion.idTipoReparacion'], name='fk_detalleReparacion_tipoReparacion1'),
        Index('fk_detalleReparacion_reparacion1_idx', 'idReparacion'),
        Index('fk_detalleReparacion_repuestos1_idx', 'idRepuesto'),
        Index('fk_detalleReparacion_tipoReparacion1_idx', 'idTipoReparacion')
    )

    idDetalleReparacion = mapped_column(Integer, primary_key=True)
    montoTotalDetalleReparacion = mapped_column(DECIMAL(10, 0))
    manoObra = mapped_column(DECIMAL(10, 0))
    precioRepuesto = mapped_column(DECIMAL(10, 0))
    idReparacion = mapped_column(Integer)
    idTipoReparacion = mapped_column(Integer)
    idRepuesto = mapped_column(Integer, comment='PARA QUE DESCUENTE DEL ALMACEN')
    descripcion = mapped_column(String(60))

    reparacion = relationship('Reparacion', back_populates='detalleReparacion')
    repuesto = relationship('Repuesto', back_populates='detalleReparacion')
    tipoReparacion = relationship('TipoReparacion', back_populates='detalleReparacion')

