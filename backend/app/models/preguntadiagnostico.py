from typing import List, Optional
from sqlalchemy import DECIMAL, Date, ForeignKeyConstraint, Index, Integer, JSON, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.database import Base

class PreguntaDiagnostico(Base):
    __tablename__ = 'preguntaDiagnostico'
    __table_args__ = (
        ForeignKeyConstraint(['idTipoDatoPreguntaDiagnostico'], ['tipoDatoPreguntaDiagnostico.idTipoDatoPreguntaDiagnostico'], name='fk_preguntaDiagnostico_tipoDatoPreguntaDiagnostico1'),
        Index('fk_preguntaDiagnostico_tipoDatoPreguntaDiagnostico1_idx', 'idTipoDatoPreguntaDiagnostico')
    )

    idPreguntaDiagnostico = mapped_column(Integer, primary_key=True, comment='preguntasDiagnostico  (define las "preguntas" o Ã\xadtems para el diagnostico segun dispositivo)\nEs la tabla que define quÃ© cosas se le deben preguntar o revisar a un dispositivo cuando llega al local para hacerle un diagnÃ³stico.\nEstas preguntas son parametrizables, lo que significa que el administrador puede crearlas, modificarlas o asignarlas a distintos tipos de dispositivos, sin tocar la base de datos.\nâ€¢\tidPreguntasDiagnostico (PK)\nâ€¢\tdescripcionPregunta (Ej: Â¿Prende?, Â¿EstÃ¡ mojado?, Â¿Tiene cargador?...)\nâ€¢\ttipoDatoPregunta (Ej: boolean, texto, nÃºmero, opciÃ³n mÃºltiple)')
    descripcionPreguntaDiagnostico = mapped_column(String(90))
    idTipoDatoPreguntaDiagnostico = mapped_column(Integer)
    opcionesPregunta = mapped_column(JSON, comment='4\tÂ¿QuÃ© tan sucio estÃ¡?\topcion\t["Limpio", "Sucio", "Muy sucio"]')

    tipoDatoPreguntaDiagnostico = relationship('TipoDatoPreguntaDiagnostico', back_populates='preguntaDiagnostico')
    tipoDispositivoSegunPregunta = relationship('TipoDispositivoSegunPregunta', back_populates='preguntaDiagnostico')

