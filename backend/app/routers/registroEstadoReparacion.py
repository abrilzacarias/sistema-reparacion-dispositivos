from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate
#from app.utils.whatsappService import send_whatsapp

from app.database import get_db
from app.schemas import registroEstadoReparacion as schemas
from app.services import registroEstadoReparacion as services

router = APIRouter(prefix="/registro-estado-reparacion", tags=["Registro Estado Reparacion"])

@router.get("/", response_model=Page[schemas.RegistroEstadoReparacionOut], summary="Listar registros de estado")
def read_registros(db: Session = Depends(get_db)):
    return paginate(services.get_registros(db))

@router.get("/{idregistro}", response_model=schemas.RegistroEstadoReparacionOut, summary="Obtener registro por ID")
def read_registro(idregistro: int, db: Session = Depends(get_db)):
    registro = services.get_registro(db, idregistro)
    if not registro:
        raise HTTPException(status_code=404, detail="Registro no encontrado")
    return registro


@router.post("/", response_model=schemas.RegistroEstadoReparacionOut,  status_code=status.HTTP_201_CREATED, summary="Crear nuevo registro")
def create_registro(registro: schemas.RegistroEstadoReparacionCreate, db: Session = Depends(get_db)):
    nuevo_registro = services.create_registro(db, registro)
    return nuevo_registro

@router.put("/{idregistro}", response_model=schemas.RegistroEstadoReparacionOut, summary="Actualizar un registro")
def update_registro(idregistro: int, registro: schemas.RegistroEstadoReparacionUpdate, db: Session = Depends(get_db)):
    updated = services.update_registro(db, idregistro, registro)
    if not updated:
        raise HTTPException(status_code=404, detail="Registro no encontrado")
    return updated

@router.delete("/{idregistro}", status_code=status.HTTP_204_NO_CONTENT)
def delete_registro(idregistro: int, db: Session = Depends(get_db)):
    success = services.delete_registro(db, idregistro)
    if not success:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

@router.get("/estado-actual/{idReparacion}", response_model=schemas.RegistroEstadoReparacionOut)
def get_estado_actual_reparacion(idReparacion: int, db: Session = Depends(get_db)):
    estado = services.get_estado_actual(db, idReparacion)
    if not estado:
        raise HTTPException(status_code=404, detail="No hay historial de estados para esta reparación")
    return estado