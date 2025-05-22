from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas import cliente as schemas
from app.services import cliente as services
from app.database import get_db

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
