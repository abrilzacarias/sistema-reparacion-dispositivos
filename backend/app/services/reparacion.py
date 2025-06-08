from sqlalchemy.orm import Session
from app.models.reparacion import Reparacion
from app.models.empleado import Empleado 
from app.schemas.reparacion import ReparacionCreate, ReparacionUpdate
from sqlalchemy.orm import selectinload
from app.models.registroEstadoReparacion import RegistroEstadoReparacion
from app.models import DetalleReparacion
from fastapi import HTTPException
from app.services.detalleReparacion import actualizar_monto_total_reparacion
from datetime import datetime
from sqlalchemy import desc


def get_reparacion(db: Session, id: int):
    return db.query(Reparacion)\
        .options(
            selectinload(Reparacion.empleado).selectinload(Empleado.persona),
            selectinload(Reparacion.diagnostico),
            selectinload(Reparacion.registroEstadoReparacion).selectinload(RegistroEstadoReparacion.estadoReparacion)
        )\
        .filter(Reparacion.idReparacion == id).first()


def get_reparaciones(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Reparacion)\
        .options(
            #selectinload(Reparacion.estadoReparacion),
            selectinload(Reparacion.empleado),
            selectinload(Reparacion.diagnostico),
            selectinload(Reparacion.registroEstadoReparacion)
        )


def create_reparacion(db: Session, reparacion: ReparacionCreate):
    db_reparacion = Reparacion(**reparacion.dict())
    db.add(db_reparacion)
    db.commit()
    db.refresh(db_reparacion)
    return db_reparacion


def update_reparacion(db: Session, id: int, reparacion: ReparacionUpdate):
    db_reparacion = db.query(Reparacion).filter(Reparacion.idReparacion == id).first()
    if not db_reparacion:
        return None

    update_data = reparacion.dict(exclude_unset=True)
    update_data.pop("montoTotalReparacion", None)

    id_estado = update_data.pop("idEstadoReparacion", None)
    id_empleado_estado = update_data.pop("idEmpleadoEstado", None)

    # Actualizar campos de la reparación
    for key, value in update_data.items():
        setattr(db_reparacion, key, value)

    # Crear un nuevo registro de estado si se proporcionan los datos
    nuevo_estado_registro = None
    if id_estado and id_empleado_estado:
        nuevo_estado_registro = RegistroEstadoReparacion(
            idReparacion=id,
            idEstadoReparacion=id_estado,
            idEmpleado=id_empleado_estado,
            fechaHoraRegistroEstadoReparacion=datetime.now()
        )
        db.add(nuevo_estado_registro)

    db.commit()
    db.refresh(db_reparacion)

    # Determinar el estado más reciente
    if nuevo_estado_registro:
        db.refresh(nuevo_estado_registro)
        estado_actual = nuevo_estado_registro.estadoReparacion
        descripcion_estado = estado_actual.descripcionEstadoReparacion
    else:
        # Buscar último estado registrado si no se creó uno nuevo
        ultimo_estado = db.query(RegistroEstadoReparacion)\
            .options(selectinload(RegistroEstadoReparacion.estadoReparacion))\
            .filter(RegistroEstadoReparacion.idReparacion == id)\
            .order_by(RegistroEstadoReparacion.fechaHoraRegistroEstadoReparacion.desc())\
            .first()
        if ultimo_estado:
            estado_actual = ultimo_estado.estadoReparacion
            descripcion_estado = estado_actual.descripcionEstadoReparacion
        else:
            descripcion_estado = None

    # Lógica de fechaEgreso
    if descripcion_estado == "Entregado":
        db_reparacion.fechaEgreso = datetime.now()
    else:
        db_reparacion.fechaEgreso = None

    db.commit()
    db.refresh(db_reparacion)

    return db_reparacion



def delete_reparacion(db: Session, id: int):
    db_reparacion = get_reparacion(db, id)
    if not db_reparacion:
        return None

    # Verificar si hay detalles asociados a la reparación
    detalles = db.query(DetalleReparacion).filter_by(idReparacion=id).first()
    if detalles:
        raise HTTPException(
            status_code=400,
            detail="No se puede eliminar la reparación porque tiene detalles asociados."
        )

    db.delete(db_reparacion)
    db.commit()
    return db_reparacion




