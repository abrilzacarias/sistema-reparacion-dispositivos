from sqlalchemy.orm import Session, selectinload
from app.models.registroEstadoReparacion import RegistroEstadoReparacion
from app.schemas import registroEstadoReparacion as schemas
from app.services.contacto import obtener_telefono_de_persona_o_contactos
from app.services.mensajes import notificar_cambio_estado_reparacion
#Formato Argentina PAPA!! Aguanteeee messi, y el vino sin soda asi pega más
from datetime import datetime
from zoneinfo import ZoneInfo

def get_registros(db: Session):
    return db.query(RegistroEstadoReparacion).options(
        selectinload(RegistroEstadoReparacion.estadoReparacion),
        selectinload(RegistroEstadoReparacion.empleado),
        selectinload(RegistroEstadoReparacion.reparacion)
    ).all()

def get_registro(db: Session, id_registro: int):
    return db.query(RegistroEstadoReparacion).options(
        selectinload(RegistroEstadoReparacion.estadoReparacion),
        selectinload(RegistroEstadoReparacion.empleado),
        selectinload(RegistroEstadoReparacion.reparacion)
    ).filter(RegistroEstadoReparacion.idRegistroEstadoReparacion == id_registro).first()

def create_registro(db: Session, registro: schemas.RegistroEstadoReparacionCreate):
    # Convertir el schema a dict y agregar la fecha/hora actual
    registro_data = registro.dict()
    registro_data['fechaHoraRegistroEstadoReparacion'] = datetime.now(ZoneInfo("America/Argentina/Buenos_Aires")),

    db_registro = RegistroEstadoReparacion(**registro_data)
    db.add(db_registro)
    db.commit()
    db.refresh(db_registro)

    # Notificar siempre el cambio de estado
    notificar_cambio_estado_reparacion(db, db_registro)

    # Si el estado es "Entregado", actualizar fechaEgreso
    if db_registro.estadoReparacion.descripcionEstadoReparacion.strip().lower() == "entregado":
        reparacion = db_registro.reparacion  # Ya está cargada por el selectinload
        reparacion.fechaEgreso = datetime.now(ZoneInfo("America/Argentina/Buenos_Aires")),
        print(f"🛠️ Estado 'Entregado' detectado, actualizando fechaEgreso a {reparacion.fechaEgreso}")
        db.commit()
        db.refresh(reparacion)
    else:
        print(f"🔄 Estado '{db_registro.estadoReparacion.descripcionEstadoReparacion}', no se actualiza fechaEgreso")

    return db_registro


def update_registro(db: Session, id_registro: int, registro: schemas.RegistroEstadoReparacionUpdate):
    db_registro = get_registro(db, id_registro)
    if not db_registro:
        return None
    for key, value in registro.dict(exclude_unset=True).items():
        setattr(db_registro, key, value)
    db.commit()
    db.refresh(db_registro)
    return db_registro

def delete_registro(db: Session, id_registro: int):
    registro = db.query(RegistroEstadoReparacion).filter(
        RegistroEstadoReparacion.idRegistroEstadoReparacion == id_registro
    ).first()
    if registro:
        db.delete(registro)
        db.commit()
        return True
    return False

def get_estado_actual(db: Session, id_reparacion: int):
    return (
        db.query(RegistroEstadoReparacion)
        .options(
            selectinload(RegistroEstadoReparacion.estadoReparacion),
            selectinload(RegistroEstadoReparacion.empleado),
            selectinload(RegistroEstadoReparacion.reparacion)  
        )
        .filter(RegistroEstadoReparacion.idReparacion == id_reparacion)
        .order_by(RegistroEstadoReparacion.fechaHoraRegistroEstadoReparacion.desc())
        .first()
    )


def get_estado_actual(db: Session, id_reparacion: int):
    return (
        db.query(RegistroEstadoReparacion)
        .options(
            selectinload(RegistroEstadoReparacion.estadoReparacion),
            selectinload(RegistroEstadoReparacion.empleado),
            selectinload(RegistroEstadoReparacion.reparacion)  
        )
        .filter(RegistroEstadoReparacion.idReparacion == id_reparacion)
        .order_by(RegistroEstadoReparacion.fechaHoraRegistroEstadoReparacion.desc())
        .first()
    )
