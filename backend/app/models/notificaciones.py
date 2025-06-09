from sqlalchemy import Column, String, DateTime, Date
from app.database import Base

class Notificacion(Base):
    __tablename__ = 'vista_notificaciones'

    idActividad = Column(String, primary_key=True)
    tipo = Column(String)
    mensaje = Column(String)
    fecha = Column(Date, nullable=True)
    accion = Column(String)