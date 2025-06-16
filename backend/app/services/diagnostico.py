from sqlalchemy.orm import Session, selectinload
from app.models import Diagnostico as Diagnostico
from app.schemas import diagnostico as schemas
from app.models.detalleDiagnostico import DetalleDiagnostico
from app.schemas.diagnostico import DiagnosticoCreate
from datetime import datetime
from app.services.historialAsignacionDiagnostico import create_historial
from app.schemas.historialAsignacionDiagnostico import HistorialAsignacionDiagnosticoCreate


def obtener_diagnosticos(db: Session):
    return db.query(Diagnostico) 
    # return db.query(Diagnostico).options(
    #     selectinload(Diagnostico.dispositivo),
    #     selectinload(Diagnostico.dispositivo.marcaDispositivo),
    #     selectinload(Diagnostico.dispositivo.tipoDispositivo),
    #     selectinload(Diagnostico.dispositivo.cliente),
    #     selectinload(Diagnostico.dispositivo.cliente.persona),
    #     selectinload(Diagnostico.empleado),
    #     selectinload(Diagnostico.empleado.persona),
    # ).order_by(Diagnostico.fechaDiagnostico.desc())

def get_diagnostico(db: Session, idDiagnostico: int):
    return obtener_diagnosticos(db).filter(Diagnostico.idDiagnostico == idDiagnostico).first()

from datetime import datetime

def create_diagnostico(db: Session, diagnostico: DiagnosticoCreate):
    # 1. Crear el objeto Diagnostico
    nuevo_diagnostico = Diagnostico(
        fechaDiagnostico=diagnostico.fechaDiagnostico,
        idDispositivo=diagnostico.idDispositivo,
        idEmpleado=diagnostico.idEmpleado
    )
    db.add(nuevo_diagnostico)
    db.commit()
    db.refresh(nuevo_diagnostico)  # para obtener el id generado

    # 2. Crear los detalles relacionados
    for detalle in diagnostico.detalles:
        nuevo_detalle = DetalleDiagnostico(
            valorDiagnostico=detalle.valorDiagnostico,
            idTipoDispositivoSegunPregunta=detalle.idTipoDispositivoSegunPregunta,
            idDiagnostico=nuevo_diagnostico.idDiagnostico  # usar el ID recién creado
        )
        db.add(nuevo_detalle)

    db.commit()

    # 3. Crear historial de asignación con fecha y hora actual
    
    historial_data = HistorialAsignacionDiagnosticoCreate(
        fechaInicioAsignacionDiagnostico=datetime.now(),
        fechaFinAsignacionDiagnostico=None,
        idDiagnostico=nuevo_diagnostico.idDiagnostico,
        idEmpleado=nuevo_diagnostico.idEmpleado
    )
    create_historial(db, historial_data)  # asegurate que esta función exista y haga el insert
    
    return nuevo_diagnostico


def update_diagnostico(
    db: Session,
    idDiagnostico: int,
    diagnostico: schemas.DiagnosticoUpdate,
    idEmpleado: int  # 👈 importante para el historial
):
    db_diagnostico = get_diagnostico(db, idDiagnostico)
    if db_diagnostico:
        update_data = diagnostico.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_diagnostico, field, value)

        db.commit()
        db.refresh(db_diagnostico)

        # 👉 Crear historial de asignación
        historial_data = HistorialAsignacionDiagnosticoCreate(
            fechaInicioAsignacionDiagnostico=datetime.now(),
            fechaFinAsignacionDiagnostico=None,
            idDiagnostico=idDiagnostico,
            idEmpleado=idEmpleado
        )
        create_historial(db, historial_data)

    return db_diagnostico

def delete_diagnostico(db: Session, idDiagnostico: int):
    db_diagnostico = get_diagnostico(db, idDiagnostico)
    if db_diagnostico:
        db.delete(db_diagnostico)
        db.commit()
        return True
    return False
    