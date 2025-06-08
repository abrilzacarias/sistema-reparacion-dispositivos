from sqlalchemy.orm import Session
from typing import List
from app.models.detallereparacion import DetalleReparacion
from app.schemas.detalleReparacion import DetalleReparacionCreate, DetalleReparacionUpdate

def get_all(db: Session) -> List[DetalleReparacion]:
    return db.query(DetalleReparacion)

def get_by_id(db: Session, detalle_id: int) -> DetalleReparacion | None:
    return db.query(DetalleReparacion).filter(DetalleReparacion.idDetalleReparacion == detalle_id).first()

def actualizar_monto_total_reparacion(db: Session, id_reparacion: int):
    from app.models import DetalleReparacion, Reparacion

    detalles = db.query(DetalleReparacion).filter(
        DetalleReparacion.idReparacion == id_reparacion
    ).all()

    monto_total = sum([detalle.montoTotalDetalleReparacion for detalle in detalles])

    reparacion = db.query(Reparacion).get(id_reparacion)
    reparacion.montoTotalReparacion = monto_total

    db.commit()
    db.refresh(reparacion)


def create(db: Session, detalle: DetalleReparacionCreate) -> DetalleReparacion:
    monto_total = detalle.manoObra + detalle.precioRepuesto

    db_detalle = DetalleReparacion(
        **detalle.dict(exclude={"montoTotalDetalleReparacion"}),
        montoTotalDetalleReparacion=monto_total
    )

    db.add(db_detalle)
    db.commit()
    db.refresh(db_detalle)

    # 🔄 Actualizar el monto total de la reparación
    actualizar_monto_total_reparacion(db, db_detalle.idReparacion)

    return db_detalle



def update(db: Session, detalle_id: int, detalle_update: DetalleReparacionUpdate) -> DetalleReparacion | None:
    db_detalle = get_by_id(db, detalle_id)
    if not db_detalle:
        return None

    update_data = detalle_update.dict(exclude_unset=True)

    # Actualizar los campos
    for key, value in update_data.items():
        setattr(db_detalle, key, value)

    # Recalcular montoTotalDetalleReparacion si cambió manoObra o precioRepuesto
    mano_obra = update_data.get("manoObra", db_detalle.manoObra)
    precio_repuesto = update_data.get("precioRepuesto", db_detalle.precioRepuesto)
    db_detalle.montoTotalDetalleReparacion = mano_obra + precio_repuesto

    db.commit()
    db.refresh(db_detalle)
    actualizar_monto_total_reparacion(db, db_detalle.idReparacion)
    return db_detalle


def delete(db: Session, detalle_id: int) -> bool:
    db_detalle = get_by_id(db, detalle_id)
    if not db_detalle:
        return False

    id_reparacion = db_detalle.idReparacion  # ⚠️ guardamos antes de borrar

    db.delete(db_detalle)
    db.commit()

    # 👇 actualizar el monto de la reparación
    actualizar_monto_total_reparacion(db, id_reparacion)

    return True

