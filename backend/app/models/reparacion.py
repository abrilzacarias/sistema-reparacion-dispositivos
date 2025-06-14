from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
import datetime
import decimal
from app.database import Base

class Reparacion(Base):
    __tablename__ = 'reparacion'
    __table_args__ = (
        ForeignKeyConstraint(['idDiagnostico'], ['diagnostico.idDiagnostico'], name='fk_reparacion_diagnostico1'),
        ForeignKeyConstraint(['idEmpleado'], ['empleado.idEmpleado'], name='fk_reparacion_empleado1'),
        Index('fk_reparacion_diagnostico1_idx', 'idDiagnostico'),
        Index('fk_reparacion_empleado1_idx', 'idEmpleado'),
    )

    idReparacion = mapped_column(Integer, primary_key=True)
    fechaIngreso = mapped_column(Date)
    montoTotalReparacion: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 0), nullable=True)
    idDiagnostico = mapped_column(Integer, ForeignKey('diagnostico.idDiagnostico'))
    idEmpleado = mapped_column(Integer, ForeignKey('empleado.idEmpleado'), comment='puede ser que un empleado haga el diagnostico y otro la reparacion')
    fechaEgreso: Mapped[Optional[datetime.date]] = mapped_column(Date)

    diagnostico = relationship('Diagnostico', back_populates='reparaciones')
    empleado = relationship('Empleado', back_populates='reparaciones')

    detalleReparacion = relationship(
        'DetalleReparacion', 
        back_populates='reparacion',
        cascade='all, delete-orphan'
    )

    registroEstadoReparacion = relationship(
        "RegistroEstadoReparacion", 
        back_populates="reparacion", 
        cascade="all, delete-orphan"
    )

    historialAsignacionReparacion = relationship(
        'HistorialAsignacionReparacion', 
        back_populates='reparacion', 
        cascade='all, delete-orphan'
    )

