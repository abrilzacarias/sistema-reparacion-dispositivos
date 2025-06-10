from sqlalchemy import Integer, String, ForeignKeyConstraint, Index, Column
from sqlalchemy.orm import mapped_column, relationship
from app.database import Base

class TipoDispositivoSegunPregunta(Base):
    __tablename__ = 'tipoDispositivoSegunPregunta'
    __table_args__ = (
        ForeignKeyConstraint(['idPreguntaDiagnostico'], ['preguntaDiagnostico.idPreguntaDiagnostico'], name='fk_tipoDispositivo_has_preguntasDiagnostico_preguntasDiagnost1'),
        ForeignKeyConstraint(['idTipoDispositivo'], ['tipoDispositivo.idTipoDispositivo'], name='fk_tipoDispositivo_has_preguntasDiagnostico_tipoDispositivo1'),
        Index('fk_tipoDispositivo_has_preguntasDiagnostico_preguntasDiagno_idx', 'idPreguntaDiagnostico'),
        Index('fk_tipoDispositivo_has_preguntasDiagnostico_tipoDispositivo_idx', 'idTipoDispositivo')
    )

    idTipoDispositivoSegunPregunta = Column(Integer, primary_key=True, index=True)
    idTipoDispositivo = mapped_column(Integer, nullable=False)
    idPreguntaDiagnostico = mapped_column(Integer, nullable=False)

    preguntaDiagnostico = relationship('PreguntaDiagnostico', back_populates='tipoDispositivoSegunPregunta')
    tipoDispositivo = relationship('TipoDispositivo', back_populates='tipoDispositivoSegunPregunta')
    detalleDiagnostico = relationship('DetalleDiagnostico', back_populates='tipoDispositivoSegunPregunta')


