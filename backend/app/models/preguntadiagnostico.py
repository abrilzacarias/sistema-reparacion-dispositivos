from sqlalchemy import Column, Integer, String, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class PreguntaDiagnostico(Base):
    __tablename__ = "preguntaDiagnostico"

    idPreguntaDiagnostico = Column(Integer, primary_key=True, autoincrement=True, comment="""
        preguntasDiagnostico (define las preguntas o ítems para el diagnóstico según dispositivo).
        Es la tabla que define qué cosas se le deben preguntar o revisar a un dispositivo cuando llega al local para hacerle un diagnóstico.
        Estas preguntas son parametrizables, lo que significa que el administrador puede crearlas, modificarlas o asignarlas a distintos tipos de dispositivos sin tocar la base de datos.
        - idPreguntaDiagnostico (PK)
        - descripcionPregunta (Ej: ¿Prende?, ¿Está mojado?, ¿Tiene cargador?...)
        - tipoDatoPregunta (Ej: boolean, texto, número, opción múltiple)
    """)

    descripcionPreguntaDiagnostico = Column(String(90), nullable=False)
    idTipoDatoPreguntaDiagnostico = Column(Integer, ForeignKey('tipoDatoPreguntaDiagnostico.idTipoDatoPreguntaDiagnostico'), nullable=False)
    opcionesPregunta = Column(JSON, nullable=True, comment='Ejemplo: ["Limpio", "Sucio", "Muy sucio"]')

    # Relaciones
    idTipoDatoPreguntaDiagnostico = Column(Integer, ForeignKey('tipoDatoPreguntaDiagnostico.idTipoDatoPreguntaDiagnostico'))
    tipoDatoPreguntaDiagnostico = relationship('TipoDatoPreguntaDiagnostico', back_populates='preguntasDiagnostico')
    tipoDispositivoSegunPregunta = relationship('TipoDispositivoSegunPregunta', back_populates='preguntaDiagnostico', cascade='all, delete-orphan')




