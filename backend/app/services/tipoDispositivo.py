from sqlalchemy.orm import Session
from app.models import TipoDispositivo, PreguntaDiagnostico, TipoDispositivoSegunPregunta
from app.schemas.tipoDispositivo import TipoDispositivoCreate

def get_all(db: Session):
    return db.query(TipoDispositivo)

def get_by_id(db: Session, id: int):
    return db.query(TipoDispositivo).filter(TipoDispositivo.idTipoDispositivo == id).first()

def create(db: Session, tipo_dispositivo: TipoDispositivoCreate):
    db_tipo = TipoDispositivo(nombreTipoDispositivo=tipo_dispositivo.nombreTipoDispositivo)
    db.add(db_tipo)
    db.commit()
    db.refresh(db_tipo)

    for pregunta in tipo_dispositivo.preguntas:
        db_pregunta = PreguntaDiagnostico(
            descripcionPreguntaDiagnostico=pregunta.descripcionPreguntaDiagnostico,
            idTipoDatoPreguntaDiagnostico=pregunta.idTipoDatoPreguntaDiagnostico,
            opcionesPregunta=pregunta.opcionesPregunta if pregunta.opcionesPregunta else None,
        )
        db.add(db_pregunta)
        db.commit()
        db.refresh(db_pregunta)

        relacion = TipoDispositivoSegunPregunta(
            idTipoDispositivo=db_tipo.idTipoDispositivo,
            idPreguntaDiagnostico=db_pregunta.idPreguntaDiagnostico
        )
        db.add(relacion)
    db.commit()
    return db_tipo

def delete(db: Session, id: int):
    db_tipo = get_by_id(db, id)
    if db_tipo:
        db.delete(db_tipo)
        db.commit()
        return True
    return False
