from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base

class TipoDispositivoSegunPregunta(Base):
    __tablename__ = 'tipoDispositivoSegunPregunta'
    __table_args__ = (
        ForeignKeyConstraint(['idPreguntaDiagnostico'], ['preguntaDiagnostico.idPreguntaDiagnostico'], name='fk_tipoDispositivo_has_preguntasDiagnostico_preguntasDiagnost1'),
        ForeignKeyConstraint(['idTipoDispositivo'], ['tipoDispositivo.idTipoDispositivo'], name='fk_tipoDispositivo_has_preguntasDiagnostico_tipoDispositivo1'),
        Index('fk_tipoDispositivo_has_preguntasDiagnostico_preguntasDiagno_idx', 'idPreguntaDiagnostico'),
        Index('fk_tipoDispositivo_has_preguntasDiagnostico_tipoDispositivo_idx', 'idTipoDispositivo')
    )

    idTipoDispositivoSegunPregunta = mapped_column(String(45), primary_key=True)
    idTipoDispositivo = mapped_column(Integer, comment='idTipoDispositivo (FK): Especifica a quÃ© tipo de dispositivo se le asigna un campo de diagnÃ³stico.\n\nidCampoDiagnostico (FK): Define quÃ© campo de diagnÃ³stico estÃ¡ disponible para ese tipo de dispositivo.\n\nPor ejemplo:\n\nSi idTipoDispositivo = 1 (TelÃ©fono), y idCampoDiagnostico = 1 (Â¿Prende?), entonces para los telÃ©fonos, el campo "Â¿Prende?" se muestra en el formulario de diagnÃ³stico.\n\nSi idTipoDispositivo = 2 (Horno), y idCampoDiagnostico = 2 (Â¿Funciona el termostato?), ese campo estarÃ¡ disponible solo para hornos.')
    idPreguntaDiagnostico = mapped_column(Integer)

    preguntaDiagnostico = relationship('PreguntaDiagnostico', back_populates='tipoDispositivoSegunPregunta')
    tipoDispositivo = relationship('TipoDispositivo', back_populates='tipoDispositivoSegunPregunta')
    detalleDiagnostico = relationship('DetalleDiagnostico', back_populates='tipoDispositivoSegunPregunta')

