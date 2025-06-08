from sqlalchemy import DateTime, ForeignKeyConstraint, Index, Integer
from sqlalchemy.orm import mapped_column, relationship
from app.database import Base

class RegistroEstadoReparacion(Base):
    __tablename__ = 'registroEstadoReparacion'
    __table_args__ = (
        ForeignKeyConstraint(['idReparacion'], ['reparacion.idReparacion'], name='fk_registroEstadoReparacion_reparacion'),
        ForeignKeyConstraint(['idEstadoReparacion'], ['estadoReparacion.idEstadoReparacion'], name='fk_registroEstadoReparacion_estado'),
        ForeignKeyConstraint(['idEmpleado'], ['empleado.idEmpleado'], name='fk_registroEstadoReparacion_empleado'),
        Index('idx_reparacion', 'idReparacion'),
        Index('idx_estado', 'idEstadoReparacion'),
        Index('idx_empleado', 'idEmpleado')
    )

    idRegistroEstadoReparacion = mapped_column(Integer, primary_key=True)
    idReparacion = mapped_column(Integer)
    idEstadoReparacion = mapped_column(Integer)
    idEmpleado = mapped_column(Integer)
    fechaHoraRegistroEstadoReparacion = mapped_column(DateTime)

    reparacion = relationship("Reparacion", back_populates="registroEstadoReparacion")
    estadoReparacion = relationship('EstadoReparacion', back_populates='registroEstadoReparacion')
    empleado = relationship('Empleado', back_populates='registroEstadoReparacion')
    