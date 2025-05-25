from sqlalchemy.orm import Session, selectinload
from app.models import Diagnostico, Dispositivo, MarcaDispositivo, TipoDispositivo, Cliente, Persona, Empleado
from app.schemas import diagnostico as schemas
from typing import Any

def obtener_diagnosticos(db: Session) -> Any:
    return db.query(Diagnostico).options(
        selectinload(Diagnostico.dispositivo),
        selectinload(Diagnostico.dispositivo.marcaDispositivo),
        selectinload(Diagnostico.dispositivo.tipoDispositivo),
        selectinload(Diagnostico.dispositivo.cliente),
        selectinload(Diagnostico.dispositivo.cliente.persona),
        selectinload(Diagnostico.empleado),
        selectinload(Diagnostico.empleado.persona),
    ).order_by(Diagnostico.fechaDiagnostico.desc())