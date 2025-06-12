from sqlalchemy.orm import Session, selectinload
from datetime import datetime
from app.models.registroEstadoReparacion import RegistroEstadoReparacion
from app.schemas import registroEstadoReparacion as schemas
from app.services.mensajes import enviarWhatsapp
from app.models.estadoReparacion import EstadoReparacion
from app.models.reparacion import Reparacion  # si tenés este modelo
from app.models.cliente import Cliente  # idem
from app.models.persona import Persona  # idem
from app.services.contacto import obtener_telefono_de_persona_o_contactos
from app.services.mensajes import notificar_cambio_estado_reparacion
from sqlalchemy.orm import Session
from app.models.reparacion import Reparacion
from app.models.empleado import Empleado
from app.models.registroEstadoReparacion import RegistroEstadoReparacion

from fastapi import HTTPException, status


def get_registros(db: Session):
    return db.query(RegistroEstadoReparacion).options(
        selectinload(RegistroEstadoReparacion.estadoReparacion),
        selectinload(RegistroEstadoReparacion.empleado),
        selectinload(RegistroEstadoReparacion.reparacion)
    ).all()

def get_registro(db: Session, id_registro: int):
    return db.query(RegistroEstadoReparacion).filter(
        RegistroEstadoReparacion.idRegistroEstadoReparacion == id_registro
    ).first()

def create_registro(db: Session, registro: schemas.RegistroEstadoReparacionCreate):
    db_registro = RegistroEstadoReparacion(
        idReparacion=registro.idReparacion,
        idEstadoReparacion=registro.idEstadoReparacion,
        idEmpleado=registro.idEmpleado,
        fechaHoraRegistroEstadoReparacion=registro.fechaHoraRegistroEstadoReparacion,
    )
    db.add(db_registro)
    db.commit()
    db.refresh(db_registro)
    notificar_cambio_estado_reparacion(db, db_registro)

    return db_registro


def update_registro(db: Session, registro_id: int, registro_update: schemas.RegistroEstadoReparacionUpdate):
    db_registro = db.query(RegistroEstadoReparacion).filter(
        RegistroEstadoReparacion.idRegistroEstadoReparacion == registro_id
    ).first()
    if not db_registro:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"El registro con id {registro_id} no existe"
        )
    errores = []

    reparacion = db.query(Reparacion).filter(
        Reparacion.idReparacion == registro_update.idReparacion
    ).first()
    if not reparacion:
        errores.append(f"idReparacion {registro_update.idReparacion} no existe")

    estado = db.query(EstadoReparacion).filter(
        EstadoReparacion.idEstadoReparacion == registro_update.idEstadoReparacion
    ).first()
    if not estado:
        errores.append(f"idEstadoReparacion {registro_update.idEstadoReparacion} no existe")

    empleado = db.query(Empleado).filter(
        Empleado.idEmpleado == registro_update.idEmpleado
    ).first()
    if not empleado:
        errores.append(f"idEmpleado {registro_update.idEmpleado} no existe")

    if errores:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="; ".join(errores)
        )

    # Si no hay errores, actualizar los datos
    db_registro.idReparacion = registro_update.idReparacion
    db_registro.idEstadoReparacion = registro_update.idEstadoReparacion
    db_registro.idEmpleado = registro_update.idEmpleado
    db_registro.fechaHoraRegistroEstadoReparacion = registro_update.fechaHoraRegistroEstadoReparacion

    db.commit()
    db.refresh(db_registro)
    return db_registro

def delete_registro(db: Session, registro_id: int):
    db_registro = db.query(RegistroEstadoReparacion).filter(
        RegistroEstadoReparacion.idRegistroEstadoReparacion == registro_id
    ).first()
    if not db_registro:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"El registro con id {registro_id} no existe"
        )
    db.delete(db_registro)
    db.commit()
    return db_registro


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
