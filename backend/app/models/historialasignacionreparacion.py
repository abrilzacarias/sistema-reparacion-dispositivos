from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
import datetime
from app.database import Base

class HistorialAsignacionReparacion(Base):
    __tablename__ = 'historialAsignacionReparacion'
    __table_args__ = (
        ForeignKeyConstraint(['idEmpleado'], ['empleado.idEmpleado'], name='fk_historialAsignacionReparacion_empleado1'),
        ForeignKeyConstraint(['idReparacion'], ['reparacion.idReparacion'], name='fk_historialAsignacionReparacion_reparacion1'),
        Index('fk_historialAsignacionReparacion_empleado1_idx', 'idEmpleado'),
        Index('fk_historialAsignacionReparacion_reparacion1_idx', 'idReparacion')
    )

    idHistorialAsignacionReparacion = mapped_column(Integer, primary_key=True)
    fechaInicioAsignacionReparacion = mapped_column(Date)
    idReparacion = mapped_column(Integer)
    idEmpleado = mapped_column(Integer)
    fechaFinAsignacionReparacion: Mapped[Optional[datetime.date]] = mapped_column(Date)

    empleado = relationship('Empleado', back_populates='historialAsignacionReparacion')
    reparacion = relationship('Reparacion', back_populates='historialAsignacionReparacion')