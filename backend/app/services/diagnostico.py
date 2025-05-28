from sqlalchemy.orm import Session, selectinload
from app.models import Diagnostico as Diagnostico
from app.schemas import diagnostico as schemas

def obtener_diagnosticos(db: Session):
    return db.query(Diagnostico) 
    # return db.query(Diagnostico).options(
    #     selectinload(Diagnostico.dispositivo),
    #     selectinload(Diagnostico.dispositivo.marcaDispositivo),
    #     selectinload(Diagnostico.dispositivo.tipoDispositivo),
    #     selectinload(Diagnostico.dispositivo.cliente),
    #     selectinload(Diagnostico.dispositivo.cliente.persona),
    #     selectinload(Diagnostico.empleado),
    #     selectinload(Diagnostico.empleado.persona),
    # ).order_by(Diagnostico.fechaDiagnostico.desc())

def get_diagnostico(db: Session, idDiagnostico: int):
    return obtener_diagnosticos(db).filter(Diagnostico.idDiagnostico == idDiagnostico).first()

def create_diagnostico(db: Session, diagnostico: schemas.DiagnosticoCreate):
    db_diagnostico = Diagnostico(**diagnostico.dict())
    db.add(db_diagnostico)
    db.commit()
    db.refresh(db_diagnostico)
    # Retornamos el diagnóstico con todas sus relaciones cargadas
    return get_diagnostico(db, db_diagnostico.idDiagnostico)

def update_diagnostico(db: Session, idDiagnostico: int, diagnostico: schemas.DiagnosticoUpdate):
    db_diagnostico = get_diagnostico(db, idDiagnostico)
    if db_diagnostico:
        update_data = diagnostico.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_diagnostico, field, value)
        db.commit()
        db.refresh(db_diagnostico)
    return db_diagnostico

def delete_diagnostico(db: Session, idDiagnostico: int):
    db_diagnostico = get_diagnostico(db, idDiagnostico)
    if db_diagnostico:
        db.delete(db_diagnostico)
        db.commit()
        return True
    return False
    