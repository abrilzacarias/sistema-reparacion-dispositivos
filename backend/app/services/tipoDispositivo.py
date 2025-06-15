from sqlalchemy.orm import Session
from app.models import TipoDispositivo, PreguntaDiagnostico, TipoDispositivoSegunPregunta
from app.schemas.tipoDispositivo import TipoDispositivoCreate
from app.schemas.tipoDispositivo import TipoDispositivoUpdate  # define un schema para update con preguntas
from app.models.detalleDiagnostico import DetalleDiagnostico

def get_all(db: Session):
    return db.query(TipoDispositivo).filter(TipoDispositivo.estadoDispositivo == True)

def get_by_id(db: Session, id: int):
    return db.query(TipoDispositivo).filter(TipoDispositivo.idTipoDispositivo == id).first()

def create(db: Session, tipo_dispositivo: TipoDispositivoCreate):
    db_tipo = TipoDispositivo(nombreTipoDispositivo=tipo_dispositivo.nombreTipoDispositivo)
    db.add(db_tipo)
    db.commit()
    db.refresh(db_tipo)

    # Solo agregar preguntas si hay alguna
    if tipo_dispositivo.preguntas:
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
        return None

    if tipo_dispositivo_data.nombreTipoDispositivo:
        db_tipo.nombreTipoDispositivo = tipo_dispositivo_data.nombreTipoDispositivo

    if tipo_dispositivo_data.preguntas is not None:
        nuevas_preguntas_data = tipo_dispositivo_data.preguntas

        relaciones_existentes = db.query(TipoDispositivoSegunPregunta).filter_by(idTipoDispositivo=id).all()
        preguntas_existentes = []

        for relacion in relaciones_existentes:
            pregunta = db.query(PreguntaDiagnostico).filter_by(idPreguntaDiagnostico=relacion.idPreguntaDiagnostico).first()
            if pregunta:
                preguntas_existentes.append({
                    'relacion': relacion,
                    'pregunta': pregunta
                })

        preguntas_procesadas = []

        for idx, nueva_pregunta in enumerate(nuevas_preguntas_data):
            if idx < len(preguntas_existentes):
                pregunta_existente = preguntas_existentes[idx]['pregunta']
                
                # REACTIVAR la pregunta si estaba desactivada
                pregunta_existente.estadoPreguntaDiagnostico = True

                pregunta_existente.descripcionPreguntaDiagnostico = nueva_pregunta.descripcionPreguntaDiagnostico.strip()
                pregunta_existente.idTipoDatoPreguntaDiagnostico = nueva_pregunta.idTipoDatoPreguntaDiagnostico
                pregunta_existente.opcionesPregunta = nueva_pregunta.opcionesPregunta if nueva_pregunta.opcionesPregunta else None
                
                preguntas_procesadas.append(pregunta_existente)
            else:
                db_pregunta = PreguntaDiagnostico(
                    descripcionPreguntaDiagnostico=nueva_pregunta.descripcionPreguntaDiagnostico.strip(),
                    idTipoDatoPreguntaDiagnostico=nueva_pregunta.idTipoDatoPreguntaDiagnostico,
                    opcionesPregunta=nueva_pregunta.opcionesPregunta if nueva_pregunta.opcionesPregunta else None,
                )
                db.add(db_pregunta)
                db.commit()
                db.refresh(db_pregunta)

                relacion = TipoDispositivoSegunPregunta(
                    idTipoDispositivo=db_tipo.idTipoDispositivo,
                    idPreguntaDiagnostico=db_pregunta.idPreguntaDiagnostico
                )
                db.add(relacion)
                preguntas_procesadas.append(db_pregunta)

        # **Eliminar preguntas sobrantes solo si no están en uso, pero NO eliminar el tipo aunque quede sin preguntas**
        if len(preguntas_existentes) > len(nuevas_preguntas_data):
            for i in range(len(nuevas_preguntas_data), len(preguntas_existentes)):
                relacion_a_eliminar = preguntas_existentes[i]['relacion']
                pregunta_a_eliminar = preguntas_existentes[i]['pregunta']

                uso = db.query(DetalleDiagnostico).filter_by(
                    idTipoDispositivoSegunPregunta=relacion_a_eliminar.idTipoDispositivoSegunPregunta
                ).first()

                if not uso:
                    # Desactivar relación en lugar de borrarla
                    relacion_a_eliminar.estadoTipoDispositivoSegunPregunta = False
                    
                    # Desactivar pregunta también si querés
                    pregunta_a_eliminar.estadoPreguntaDiagnostico = False

        db.commit()

    db.refresh(db_tipo)
    return db_tipo
