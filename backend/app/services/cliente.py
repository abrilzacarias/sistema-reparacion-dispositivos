from sqlalchemy.orm import Session
from app.models import Cliente, Persona, Contacto, Domicilio
from app.schemas.cliente import ClienteCreate, ClienteUpdate

def get_cliente(db: Session, idCliente: int):
    return (
        db.query(Cliente)
        .join(Persona, Cliente.idPersona == Persona.idPersona)
        .filter(Cliente.idCliente == idCliente, Persona.estadoPersona == True)
        .first()
    )

def get_clientes(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Cliente)
        .join(Persona, Cliente.idPersona == Persona.idPersona)
        .filter(Persona.estadoPersona == True)
        .offset(skip)
        .limit(limit)
        .all()
    )

def create_cliente(db: Session, cliente_in: ClienteCreate):
    try:
        # Crear contactos y domicilios
        contactos = [Contacto(**c.dict()) for c in cliente_in.persona.contactos]
        domicilios = [Domicilio(**d.dict()) for d in cliente_in.persona.domicilios]

        # Crear persona
        db_persona = Persona(
            cuit=cliente_in.persona.cuit,
            nombre=cliente_in.persona.nombre,
            apellido=cliente_in.persona.apellido,
            fechaNacimiento=cliente_in.persona.fechaNacimiento,
            contactos=contactos,
            domicilios=domicilios,
        )
        db.add(db_persona)
        db.commit()
        db.refresh(db_persona)

        # Crear cliente y asociar persona
        db_cliente = Cliente(
            idPersona=db_persona.idPersona,
            observaciones=cliente_in.observaciones
        )
        db.add(db_cliente)
        db.commit()
        db.refresh(db_cliente)

        return db_cliente
    except Exception as e:
        db.rollback()
        print("Error al crear cliente:", e)
        raise

def update_cliente(db: Session, idCliente: int, cliente_in: ClienteUpdate):
    db_cliente = get_cliente(db, idCliente)
    if not db_cliente:
        return None

    # Actualizar observaciones del cliente
    db_cliente.observaciones = cliente_in.observaciones

    # Actualizar datos de persona asociada
    db_persona = db_cliente.persona
    persona_data = cliente_in.persona

    db_persona.cuit = persona_data.cuit
    db_persona.nombre = persona_data.nombre
    db_persona.apellido = persona_data.apellido
    db_persona.fechaNacimiento = persona_data.fechaNacimiento

    # Contactos y domicilios → simplificado: borrar y reemplazar
    db_persona.contactos.clear()
    db_persona.domicilios.clear()
    db_persona.contactos.extend([Contacto(**c.dict()) for c in persona_data.contactos])
    db_persona.domicilios.extend([Domicilio(**d.dict()) for d in persona_data.domicilios])

    db.commit()
    db.refresh(db_cliente)
    return db_cliente

def delete_cliente(db: Session, idCliente: int):
    db_cliente = get_cliente(db, idCliente)
    if not db_cliente:
        return None
    persona = db_cliente.persona
    # 1. Eliminar cliente
    db.delete(db_cliente)
    db.commit()
    # 2. Eliminar contactos
    for contacto in persona.contactos:
        db.delete(contacto)
    # 3. Eliminar domicilios
    for domicilio in persona.domicilios:
        db.delete(domicilio)
    # 4. Deshabilitar persona
    persona.estadoPersona = False
    db.commit()
    return True
