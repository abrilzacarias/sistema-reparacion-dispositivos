from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
import datetime
from app.database import Base

class HistorialAsignacionDiagnostico(Base):
    __tablename__ = 'historialAsignacionDiagnostico'
    __table_args__ = (
        ForeignKeyConstraint(['idDiagnostico'], ['diagnostico.idDiagnostico'], name='fk_historialAsignacionDiagnostico_diagnostico1'),
        ForeignKeyConstraint(['idEmpleado'], ['empleado.idEmpleado'], name='fk_historialAsignacionDiagnostico_empleado1'),
        Index('fk_historialAsignacionDiagnostico_diagnostico1_idx', 'idDiagnostico'),
        Index('fk_historialAsignacionDiagnostico_empleado1_idx', 'idEmpleado')
    )

    idHistorialAsignacionDiagnostico = mapped_column(Integer, primary_key=True)
    fechaInicioAsignacionDiagnostico = mapped_column(Date)
    idDiagnostico = mapped_column(Integer)
    idEmpleado = mapped_column(Integer)
    fechaFinAsignacionDiagnostico = mapped_column(Date)

    diagnostico = relationship('Diagnostico', back_populates='historialAsignacionDiagnostico')
    empleado = relationship('Empleado', back_populates='historialAsignacionDiagnostico')

