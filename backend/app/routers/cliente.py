from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from fastapi_pagination import Page
from app.schemas.reparacion import ReparacionOut
from fastapi_pagination.ext.sqlalchemy import paginate
from app.schemas import cliente as schemas
from app.services import cliente as services
from app.models import Cliente
from app.models import Persona
from app.services import cliente as cliente_service
from app.database import get_db
from app.services import persona as persona_service  # importás el servicio de persona
from sqlalchemy.exc import SQLAlchemyError



router = APIRouter(prefix="/clientes", tags=["Clientes"])

@router.get("/", response_model=List[schemas.ClienteOut], summary="Obtener lista de clientes")
def read_clientes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    clientes = services.get_clientes(db, skip=skip, limit=limit)
    return clientes

@router.get("/{idCliente}", response_model=schemas.ClienteOut, summary="Obtener cliente por id")
def read_cliente(idCliente: int, db: Session = Depends(get_db)):
    cliente = services.get_cliente(db, idCliente)
    if cliente is None:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente

@router.post("/", response_model=schemas.ClienteOut, status_code=status.HTTP_201_CREATED, summary="Crear un nuevo cliente")
def create_cliente(cliente: schemas.ClienteCreate, db: Session = Depends(get_db)):
    return services.create_cliente(db, cliente)

@router.put("/{idCliente}", response_model=schemas.ClienteOut, summary="Actualizar un cliente")
def update_cliente(idCliente: int, cliente: schemas.ClienteUpdate, db: Session = Depends(get_db)):
    db_cliente = services.update_cliente(db, idCliente, cliente)
    if db_cliente is None:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return db_cliente

@router.delete("/{idCliente}", status_code=status.HTTP_204_NO_CONTENT, summary="Dar de baja (inhabilitar) un cliente")
def delete_cliente(idCliente: int, db: Session = Depends(get_db)):
    try:
        cliente = db.query(Cliente).filter(Cliente.idCliente == idCliente).first()
        if not cliente:
            raise HTTPException(status_code=404, detail="Cliente no encontrado")

        persona = db.query(Persona).filter(Persona.idPersona == cliente.idPersona).first()
        if not persona:
            raise HTTPException(status_code=404, detail="Persona no encontrada")

        persona.estadoPersona = False
        db.commit()
        return
    except Exception as e:
        db.rollback()

        raise HTTPException(status_code=500, detail="Error interno del servidor")
    
@router.get("/{id_persona}/reparaciones", response_model=Page[ReparacionOut])
def listar_reparaciones_del_cliente(
    id_persona: int,
    db: Session = Depends(get_db)
):
    query = cliente_service.get_reparaciones_por_id_persona(db, id_persona)
    return paginate(query)
