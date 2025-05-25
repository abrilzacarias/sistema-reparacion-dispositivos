from sqlalchemy.orm import Session, selectinload, joinedload
from app.models import Diagnostico
from app.schemas import diagnostico as schemas
from typing import List, Optional

def obtener_diagnosticos(db: Session) -> List[schemas.DiagnosticoWithRelations]:
    """Obtiene todos los diagnósticos con sus relaciones"""
    return db.query(Diagnostico).options(
        selectinload(Diagnostico.dispositivo)
            .selectinload("marcaDispositivo"),
        selectinload(Diagnostico.dispositivo)
            .selectinload("tipoDispositivo"),
        selectinload(Diagnostico.dispositivo)
            .selectinload("cliente")
            .selectinload("persona"),
        selectinload(Diagnostico.empleado)
            .selectinload("persona"),
    ).order_by(Diagnostico.fechaDiagnostico.desc()).all()

def get_diagnostico_by_id(db: Session, id_diagnostico: int) -> Optional[schemas.DiagnosticoWithRelations]:
    """Obtiene un diagnóstico específico por ID con todas sus relaciones"""
    return db.query(Diagnostico).filter(Diagnostico.idDiagnostico == id_diagnostico).options(
        joinedload(Diagnostico.dispositivo)
            .joinedload("marcaDispositivo"),
        joinedload(Diagnostico.dispositivo)
            .joinedload("tipoDispositivo"),
        joinedload(Diagnostico.dispositivo)
            .joinedload("cliente")
            .joinedload("persona"),
        joinedload(Diagnostico.empleado)
            .joinedload("persona"),
    ).first()