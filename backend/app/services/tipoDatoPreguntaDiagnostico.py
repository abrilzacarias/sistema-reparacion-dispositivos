from sqlalchemy.orm import Session
from app.models.tipoDatoPreguntaDiagnostico import TipoDatoPreguntaDiagnostico
from app.schemas.tipoDatoPreguntaDiagnostico import TipoDatoPreguntaDiagnosticoCreate, TipoDatoPreguntaDiagnosticoUpdate

def get_all(db: Session):
    return db.query(TipoDatoPreguntaDiagnostico).all()

def get_by_id(db: Session, id: int):
    return db.query(TipoDatoPreguntaDiagnostico).filter(TipoDatoPreguntaDiagnostico.idTipoDatoPreguntaDiagnostico == id).first()

def create(db: Session, tipo: TipoDatoPreguntaDiagnosticoCreate):
    nuevo = TipoDatoPreguntaDiagnostico(**tipo.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

def update(db: Session, id: int, datos: TipoDatoPreguntaDiagnosticoUpdate):
    obj = get_by_id(db, id)
    if obj:
        for key, value in datos.dict(exclude_unset=True).items():
            setattr(obj, key, value)
        db.commit()
        db.refresh(obj)
    return obj

def delete(db: Session, id: int):
    obj = get_by_id(db, id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj