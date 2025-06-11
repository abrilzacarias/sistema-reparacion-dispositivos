from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.preguntaDiagnostico import PreguntaDiagnostico
from app.schemas.preguntaDiagnostico import PreguntaDiagnosticoCreate, PreguntaDiagnosticoUpdate
from app.models import TipoDatoPreguntaDiagnostico


def get_all(db: Session):
    return db.query(PreguntaDiagnostico).all()

def get_by_id(db: Session, id: int):
    return db.query(PreguntaDiagnostico).filter(PreguntaDiagnostico.idPreguntaDiagnostico == id).first()

def create(db: Session, pregunta: PreguntaDiagnosticoCreate):
    nueva = PreguntaDiagnostico(**pregunta.dict())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva

def update(db: Session, id: int, datos: PreguntaDiagnosticoUpdate):
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

def verificarTipoDatoPregunta(id_tipo: int, db: Session):
    tipo = db.query(TipoDatoPreguntaDiagnostico).filter_by(idTipoDatoPreguntaDiagnostico=id_tipo).first()
    if not tipo:
        raise HTTPException(status_code=400, detail="Tipo de dato de pregunta no válido")