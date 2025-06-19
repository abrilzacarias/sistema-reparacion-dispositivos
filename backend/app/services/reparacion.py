from sqlalchemy.orm import Session
from app.models.reparacion import Reparacion
from app.models.empleado import Empleado 
from app.schemas.reparacion import ReparacionCreate, ReparacionUpdate
from sqlalchemy.orm import selectinload
from app.models.registroEstadoReparacion import RegistroEstadoReparacion
from app.models import DetalleReparacion
from fastapi import HTTPException
from app.services.detalleReparacion import actualizar_monto_total_reparacion
from sqlalchemy import desc
from app.models.historialAsignacionReparacion import HistorialAsignacionReparacion
from sqlalchemy import func
from app.models.registroEstadoReparacion import RegistroEstadoReparacion
from app.models.estadoReparacion import EstadoReparacion
from datetime import datetime
from zoneinfo import ZoneInfo

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
            selectinload(Reparacion.empleado),
            selectinload(Reparacion.diagnostico),
            selectinload(Reparacion.registroEstadoReparacion)
        )\
        .filter(Reparacion.estadoReparacion == 1)\
        .offset(skip)\
        .limit(limit)\

def get_reparaciones_status_summary(db: Session):
    subq = (
        db.query(
            RegistroEstadoReparacion.idReparacion,
            func.max(RegistroEstadoReparacion.fechaHoraRegistroEstadoReparacion).label("max_fecha")
        )
        .group_by(RegistroEstadoReparacion.idReparacion)
        .subquery()
    )

    print("[DEBUG] Subconsulta (último estado por reparación):")
    subq_rows = db.query(subq).all()
    for row in subq_rows:
        print(row)
    q = (
        db.query(
            EstadoReparacion.descripcionEstadoReparacion,
            func.count().label("cantidad")
        )
        .join(RegistroEstadoReparacion, RegistroEstadoReparacion.idEstadoReparacion == EstadoReparacion.idEstadoReparacion)
        .join(subq, (subq.c.idReparacion == RegistroEstadoReparacion.idReparacion) & (subq.c.max_fecha == RegistroEstadoReparacion.fechaHoraRegistroEstadoReparacion))
        .group_by(EstadoReparacion.descripcionEstadoReparacion)
    )

    print("[DEBUG] Resultado de la consulta principal (conteo por estado):")
    for row in q.all():
        print(f"Estado: {row.descripcionEstadoReparacion}, Cantidad: {row.cantidad}")

    resultado = {row.descripcionEstadoReparacion: row.cantidad for row in q.all()}
    print("[DEBUG] Diccionario final de resultado:", resultado)
    return resultado

def create_reparacion(db: Session, reparacion: ReparacionCreate):
    db_reparacion = Reparacion(**reparacion.dict())
    db.add(db_reparacion)
    db.commit()
    db.refresh(db_reparacion)

    # Registrar asignación de empleado si hay empleado asignado
    if db_reparacion.idEmpleado:
        historial = HistorialAsignacionReparacion(
            idReparacion=db_reparacion.idReparacion,
            idEmpleado=db_reparacion.idEmpleado,
            fechaInicioAsignacionReparacion=datetime.now(ZoneInfo("America/Argentina/Buenos_Aires")),
            fechaFinAsignacionReparacion=None
        )
        db.add(historial)

    # Lógica para registrar estado inicial y actualizar fechaEgreso
    nuevo_estado_registro = None
    # Usamos el idEstadoReparacion y idEmpleado desde el Pydantic (reparacion), no del modelo que no lo tiene
    id_estado = getattr(reparacion, "idEstadoReparacion", None)
    id_empleado_estado = db_reparacion.idEmpleado

    if id_estado and id_empleado_estado:
        nuevo_estado_registro = RegistroEstadoReparacion(
            idReparacion=db_reparacion.idReparacion,
            idEstadoReparacion=id_estado,
            idEmpleado=id_empleado_estado,
            fechaHoraRegistroEstadoReparacion=datetime.now(ZoneInfo("America/Argentina/Buenos_Aires")),
        )
        db.add(nuevo_estado_registro)

    db.commit()
    db.refresh(db_reparacion)

    if nuevo_estado_registro:
        db.refresh(nuevo_estado_registro)
        estado_actual = nuevo_estado_registro.estadoReparacion
        descripcion_estado = estado_actual.descripcionEstadoReparacion
    else:
        ultimo_estado = db.query(RegistroEstadoReparacion)\
            .options(selectinload(RegistroEstadoReparacion.estadoReparacion))\
            .filter(RegistroEstadoReparacion.idReparacion == db_reparacion.idReparacion)\
            .order_by(RegistroEstadoReparacion.fechaHoraRegistroEstadoReparacion.desc())\
            .first()
        if ultimo_estado:
            estado_actual = ultimo_estado.estadoReparacion
            descripcion_estado = estado_actual.descripcionEstadoReparacion
        else:
            descripcion_estado = None

    if descripcion_estado == "Entregado":
        db_reparacion.fechaEgreso = datetime.now(ZoneInfo("America/Argentina/Buenos_Aires"))
    else:
        db_reparacion.fechaEgreso = None

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

    id_empleado_anterior = db_reparacion.idEmpleado
    id_empleado_nuevo = update_data.get("idEmpleado")

    for key, value in update_data.items():
        setattr(db_reparacion, key, value)

    if id_empleado_nuevo and id_empleado_nuevo != id_empleado_anterior:
        historial_anterior = db.query(HistorialAsignacionReparacion)\
            .filter(
                HistorialAsignacionReparacion.idReparacion == id,
                HistorialAsignacionReparacion.fechaFinAsignacionReparacion == None
            )\
            .order_by(HistorialAsignacionReparacion.fechaInicioAsignacionReparacion.desc())\
            .first()
        if historial_anterior:
            historial_anterior.fechaFinAsignacionReparacion = datetime.now(ZoneInfo("America/Argentina/Buenos_Aires")),
            db.add(historial_anterior)
        nuevo_historial = HistorialAsignacionReparacion(
            idReparacion=id,
            idEmpleado=id_empleado_nuevo,
            fechaInicioAsignacionReparacion=datetime.now(ZoneInfo("America/Argentina/Buenos_Aires")),
            fechaFinAsignacionReparacion=None
        )
        db.add(nuevo_historial)
    nuevo_estado_registro = None
    if id_estado and id_empleado_estado:
        nuevo_estado_registro = RegistroEstadoReparacion(
            idReparacion=id,
            idEstadoReparacion=id_estado,
            idEmpleado=id_empleado_estado,
            fechaHoraRegistroEstadoReparacion=datetime.now(ZoneInfo("America/Argentina/Buenos_Aires")),
        )
        db.add(nuevo_estado_registro)

    db.commit()
    db.refresh(db_reparacion)

    if nuevo_estado_registro:
        db.refresh(nuevo_estado_registro)
        estado_actual = nuevo_estado_registro.estadoReparacion
        descripcion_estado = estado_actual.descripcionEstadoReparacion
    else:
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
    if descripcion_estado == "Entregado":
        db_reparacion.fechaEgreso = datetime.now(ZoneInfo("America/Argentina/Buenos_Aires")),
    else:
        db_reparacion.fechaEgreso = None

    db.commit()
    db.refresh(db_reparacion)

    return db_reparacion

def delete_reparacion(db: Session, id: int):
    db_reparacion = get_reparacion(db, id)
    if not db_reparacion:
        return None
    detalles = db.query(DetalleReparacion).filter_by(idReparacion=id).first()
    if detalles:
        raise HTTPException(
            status_code=400,
            detail="No se puede eliminar la reparación porque tiene detalles asociados."
        )

    db.delete(db_reparacion)
    db.commit()
    return db_reparacion