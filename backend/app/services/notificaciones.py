from sqlalchemy.orm import Session
from app.models import Notificacion

def obtener_notificaciones_service(db: Session):
    return db.query(Notificacion).order_by(Notificacion.fecha.desc()).limit(20)