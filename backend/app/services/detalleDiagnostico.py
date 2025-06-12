from sqlalchemy.orm import Session
from app.models.detalleDiagnostico import DetalleDiagnostico
from app.schemas.detalleDiagnostico import DetalleDiagnosticoCreate, DetalleDiagnosticoUpdate
from typing import List, Optional

def get_detalleDiagnostico(db: Session, detalleDiagnostico_id: int) -> Optional[DetalleDiagnostico]:
    return db.query(DetalleDiagnostico).filter(DetalleDiagnostico.idDetalleDiagnostico == detalleDiagnostico_id).first()

def get_detalleDiagnosticos(db: Session, skip: int = 0, limit: int = 100) -> List[DetalleDiagnostico]:
    return db.query(DetalleDiagnostico).offset(skip).limit(limit).all()

def create_detalleDiagnostico(db: Session, detalleDiagnostico: DetalleDiagnosticoCreate) -> DetalleDiagnostico:
    db_detalle = DetalleDiagnostico(**detalleDiagnostico.dict())
    db.add(db_detalle)
    db.commit()
    db.refresh(db_detalle)
    return db_detalle

def update_detalleDiagnostico(db: Session, detalleDiagnostico_id: int, detalleDiagnostico: DetalleDiagnosticoUpdate) -> Optional[DetalleDiagnostico]:
    db_detalle = get_detalleDiagnostico(db, detalleDiagnostico_id)
    if not db_detalle:
        return None
    for key, value in detalleDiagnostico.dict().items():
        setattr(db_detalle, key, value)
    db.commit()
    db.refresh(db_detalle)
    return db_detalle

def delete_detalleDiagnostico(db: Session, detalleDiagnostico_id: int) -> bool:
    db_detalle = get_detalleDiagnostico(db, detalleDiagnostico_id)
    if not db_detalle:
        return False
    db.delete(db_detalle)
    db.commit()
    return True
