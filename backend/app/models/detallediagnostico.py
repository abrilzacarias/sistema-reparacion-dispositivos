from typing import List, Optional
from sqlalchemy import ForeignKeyConstraint, Index, Integer, String
from sqlalchemy.orm import mapped_column, relationship
from app.database import Base

class DetalleDiagnostico(Base):
    __tablename__ = 'detalleDiagnostico'
    __table_args__ = (
        ForeignKeyConstraint(
            ['idDiagnostico'], 
            ['diagnostico.idDiagnostico'], 
            name='fk_detalleDiagnostico_diagnostico1'
        ),
        ForeignKeyConstraint(
            ['idTipoDispositivoSegunPregunta'], 
            ['tipoDispositivoSegunPregunta.idTipoDispositivoSegunPregunta'], 
            name='fk_detalleDiagnostico_tipoDispositivoSegunPreguntas1'
        ),
        Index('fk_detalleDiagnostico_diagnostico1_idx', 'idDiagnostico'),
        Index('fk_detalleDiagnostico_tipoDispositivoSegunPreguntas1_idx', 'idTipoDispositivoSegunPregunta'),
    )

    idDetalleDiagnostico = mapped_column(Integer, primary_key=True, autoincrement=True)
    valorDiagnostico= mapped_column(String(150), nullable=False)
    idDiagnostico = mapped_column(Integer, nullable=False)
    idTipoDispositivoSegunPregunta = mapped_column(Integer, nullable=False)  # <-- Cambiado a Integer

    diagnostico = relationship('Diagnostico', back_populates='detalleDiagnostico')
    tipoDispositivoSegunPregunta = relationship('TipoDispositivoSegunPregunta', back_populates='detalleDiagnostico')


