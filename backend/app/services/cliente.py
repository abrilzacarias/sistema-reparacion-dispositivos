from sqlalchemy.orm import Session
from app.models import Cliente, Persona
from app.schemas.cliente import ClienteCreate, ClienteUpdate

def get_cliente(db: Session, idCliente: int):
    return db.query(Cliente).filter(Cliente.idCliente == idCliente).first()


def get_clientes(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Cliente)
        .join(Persona, Cliente.idPersona == Persona.idPersona)
        .filter(Persona.estadoPersona == True)
        .offset(skip)
        .limit(limit)
        .all()
    )

def create_cliente(db: Session, cliente: ClienteCreate):
    try:
        db_cliente = Cliente(**cliente.dict())
        db.add(db_cliente)
        db.commit()
        db.refresh(db_cliente)
        return db_cliente
    except Exception as e:
        db.rollback()
        print("Error al crear cliente:", e)
        raise

def update_cliente(db: Session, idCliente: int, cliente: ClienteUpdate):
    db_cliente = get_cliente(db, idCliente)
    if not db_cliente:
        return None
    for key, value in cliente.dict().items():
        setattr(db_cliente, key, value)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

def delete_cliente(db: Session, idCliente: int):
    db_cliente = get_cliente(db, idCliente)
    if not db_cliente:
        return None
    db.delete(db_cliente)
    db.commit()
    return db_cliente
