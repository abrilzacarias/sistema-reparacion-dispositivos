from sqlalchemy.orm import Session
from fastapi import HTTPException
from sqlalchemy.orm import joinedload
from app.models import Cliente, Persona, Reparacion, Diagnostico, Dispositivo
from app.schemas.cliente import ClienteCreate, ClienteUpdate, ClienteOut

def create_cliente(db: Session, data: ClienteCreate) -> ClienteOut:
    persona = db.query(Persona).filter(Persona.idPersona == data.idPersona).first()
    if not persona or not persona.estadoPersona:
        raise HTTPException(status_code=400, detail="No se puede crear cliente: la persona no existe o está inhabilitada")

    db_cliente = Cliente(
        idPersona=data.idPersona,
        observaciones=data.observaciones,
    )
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente


def update_cliente(db: Session, idCliente: int, data: ClienteUpdate) -> ClienteOut:
    cliente = db.query(Cliente).filter(Cliente.idCliente == idCliente).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    persona = db.query(Persona).filter(Persona.idPersona == cliente.idPersona).first()
    if not persona or not persona.estadoPersona:
        raise HTTPException(status_code=403, detail="La persona asociada está deshabilitada")

    if data.observaciones is not None:
        cliente.observaciones = data.observaciones

    db.commit()
    db.refresh(cliente)
    return cliente



def get_cliente(db: Session, idCliente: int) -> ClienteOut:
    cliente = (
        db.query(Cliente)
        .join(Persona)
        .filter(Cliente.idCliente == idCliente, Persona.estadoPersona == True)
        .first()
    )
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    
    # Filtrar contactos primarios
    if cliente.persona and cliente.persona.contactos:
        cliente.persona.contactos = [c for c in cliente.persona.contactos if c.esPrimario]

    return cliente


def get_clientes(db: Session, skip: int = 0, limit: int = 100) -> list[ClienteOut]:
    clientes = (
        db.query(Cliente)
        .join(Persona)
        .filter(Persona.estadoPersona == True)
        .offset(skip)
        .limit(limit)
        .all()
    )
    # Filtrar contactos primarios para cada persona
    for cliente in clientes:
        if cliente.persona and cliente.persona.contactos:
            cliente.persona.contactos = [c for c in cliente.persona.contactos if c.esPrimario]

    return clientes


def delete_cliente(db: Session, idCliente: int) -> dict:
    cliente = db.query(Cliente).filter(Cliente.idCliente == idCliente).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    id_persona = cliente.idPersona
    
    # Deshabilitar persona
    persona = db.query(Persona).filter(Persona.idPersona == id_persona).first()
    if persona:
        persona.estadoPersona = False
        db.commit()
    else:
        raise HTTPException(status_code=404, detail="Persona no encontrada")

    resultado = {
        "deleted_cliente": idCliente,
        "persona_disabled": id_persona
    }
    print(f"[INFO] Cliente eliminado: {resultado}")
    return resultado


def get_reparaciones_por_id_persona(db: Session, id_persona: int):
    from app.models import Reparacion, Diagnostico, Dispositivo, Cliente

    return (
        db.query(Reparacion)
        .options(
            joinedload(Reparacion.diagnostico)
                .joinedload(Diagnostico.dispositivo),  # Por si necesitás info de dispositivo
            joinedload(Reparacion.empleado),
            joinedload(Reparacion.registroEstadoReparacion)  # Asegurate que se llama así en el modelo
        )
        .select_from(Reparacion)
        .join(Diagnostico, Diagnostico.idDiagnostico == Reparacion.idDiagnostico)
        .join(Dispositivo, Dispositivo.idDispositivo == Diagnostico.idDispositivo)
        .join(Cliente, Cliente.idCliente == Dispositivo.idCliente)
        .filter(Cliente.idPersona == id_persona)
        .order_by(Reparacion.fechaIngreso.desc())
    )