from sqlalchemy.orm import Session,joinedload
from app.models.tipoDispositivoSegunPregunta import TipoDispositivoSegunPregunta
from app.schemas.tipoDispositivoSegunPregunta import TipoDispositivoSegunPreguntaCreate, TipoDispositivoSegunPreguntaUpdate
from app.models.preguntaDiagnostico import PreguntaDiagnostico
from app.models.tipoDatoPreguntaDiagnostico import TipoDatoPreguntaDiagnostico

def get_all(db: Session):
    return db.query(TipoDispositivoSegunPregunta).options(
        joinedload(TipoDispositivoSegunPregunta.preguntaDiagnostico),
        joinedload(TipoDispositivoSegunPregunta.tipoDispositivo)
    )

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

def get_by_tipo_dispositivo(db: Session, id_tipo: int):
    return (
        db.query(TipoDispositivoSegunPregunta)
        .join(PreguntaDiagnostico)             # Pregunta asociada
        .join(TipoDatoPreguntaDiagnostico)     # Tipo de dato
        .filter(TipoDispositivoSegunPregunta.idTipoDispositivo == id_tipo)
        .order_by(TipoDispositivoSegunPregunta.idTipoDispositivoSegunPregunta)
        .all()
    )

def get_grouped_by_dispositivo(db: Session):
    registros = db.query(TipoDispositivoSegunPregunta).options(
        joinedload(TipoDispositivoSegunPregunta.preguntaDiagnostico),
        joinedload(TipoDispositivoSegunPregunta.tipoDispositivo)
    ).all()

    agrupado = {}
    for item in registros:
        tipo_obj = item.tipoDispositivo
        nombre = tipo_obj.nombreTipoDispositivo
        if nombre not in agrupado:
            agrupado[nombre] = {
                "tipoDispositivo": tipo_obj,
                "preguntas": []
            }
        agrupado[nombre]["preguntas"].append(item.preguntaDiagnostico.descripcionPreguntaDiagnostico)

    return list(agrupado.values())