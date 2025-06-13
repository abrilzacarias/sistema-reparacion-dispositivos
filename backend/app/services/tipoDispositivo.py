from sqlalchemy.orm import Session
from app.models import TipoDispositivo, PreguntaDiagnostico, TipoDispositivoSegunPregunta
from app.schemas.tipoDispositivo import TipoDispositivoCreate
from app.schemas.tipoDispositivo import TipoDispositivoUpdate  # define un schema para update con preguntas
from app.models.detalleDiagnostico import DetalleDiagnostico



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

def actualizar_tipo_dispositivo(db: Session, id: int, tipo_dispositivo_data: TipoDispositivoUpdate):
    db_tipo = get_by_id(db, id)
    if not db_tipo:
        return None  # O lanzar excepción

    # Actualizar nombreTipoDispositivo
    if tipo_dispositivo_data.nombreTipoDispositivo:
        db_tipo.nombreTipoDispositivo = tipo_dispositivo_data.nombreTipoDispositivo

    # Si se envían nuevas preguntas
    if tipo_dispositivo_data.preguntas is not None:
        # Obtener relaciones existentes
        relaciones = db.query(TipoDispositivoSegunPregunta).filter_by(idTipoDispositivo=id).all()

        for relacion in relaciones:
            # Verificar si la relación está siendo usada en algún diagnóstico
            uso = db.query(DetalleDiagnostico).filter_by(
                idTipoDispositivoSegunPregunta=relacion.idTipoDispositivoSegunPregunta
            ).first()

            if not uso:
                # Eliminar la pregunta y la relación si no están en uso
                pregunta = db.query(PreguntaDiagnostico).filter_by(
                    idPreguntaDiagnostico=relacion.idPreguntaDiagnostico
                ).first()
                if pregunta:
                    db.delete(pregunta)
                db.delete(relacion)
        db.commit()

        # Volver a cargar las relaciones después del borrado
        preguntas_existentes = db.query(PreguntaDiagnostico).join(TipoDispositivoSegunPregunta).filter(
            TipoDispositivoSegunPregunta.idTipoDispositivo == db_tipo.idTipoDispositivo
        ).all()

        # Crear nuevas preguntas y relaciones si no existen
        for pregunta in tipo_dispositivo_data.preguntas:
            ya_existe = next((
                p for p in preguntas_existentes
                if p.descripcionPreguntaDiagnostico.strip().lower() == pregunta.descripcionPreguntaDiagnostico.strip().lower()
                and p.idTipoDatoPreguntaDiagnostico == pregunta.idTipoDatoPreguntaDiagnostico
            ), None)

            if ya_existe:
                continue  # No la insertes de nuevo

            # Crear nueva pregunta
            db_pregunta = PreguntaDiagnostico(
                descripcionPreguntaDiagnostico=pregunta.descripcionPreguntaDiagnostico.strip(),
                idTipoDatoPreguntaDiagnostico=pregunta.idTipoDatoPreguntaDiagnostico,
                opcionesPregunta=pregunta.opcionesPregunta if pregunta.opcionesPregunta else None,
            )
            db.add(db_pregunta)
            db.commit()
            db.refresh(db_pregunta)

            # Crear relación
            relacion = TipoDispositivoSegunPregunta(
                idTipoDispositivo=db_tipo.idTipoDispositivo,
                idPreguntaDiagnostico=db_pregunta.idPreguntaDiagnostico
            )
            db.add(relacion)

        db.commit()

    db.commit()
    db.refresh(db_tipo)
    return db_tipo
