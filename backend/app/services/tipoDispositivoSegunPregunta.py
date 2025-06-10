from sqlalchemy.orm import Session
from app.models.tipoDispositivoSegunPregunta import TipoDispositivoSegunPregunta
from app.schemas.tipoDispositivoSegunPregunta import TipoDispositivoSegunPreguntaCreate, TipoDispositivoSegunPreguntaUpdate

def get_all(db: Session):
    return db.query(TipoDispositivoSegunPregunta).all()

def get_by_id(db: Session, id: str):
    return db.query(TipoDispositivoSegunPregunta).filter(TipoDispositivoSegunPregunta.idTipoDispositivoSegunPregunta == id).first()

def create(db: Session, entrada: TipoDispositivoSegunPreguntaCreate):
    obj = TipoDispositivoSegunPregunta(**entrada.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def update(db: Session, id: str, entrada: TipoDispositivoSegunPreguntaUpdate):
    obj = get_by_id(db, id)
    if obj:
        for key, value in entrada.dict(exclude_unset=True).items():
            setattr(obj, key, value)
        db.commit()
        db.refresh(obj)
    return obj

def delete(db: Session, id: str):
    obj = get_by_id(db, id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj