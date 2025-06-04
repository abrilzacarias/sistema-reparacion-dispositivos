from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.tipoDispositivo import TipoDispositivoRead, TipoDispositivoCreate
from app.services import tipoDispositivo as tipo_service
from app.database import get_db

router = APIRouter(
    prefix="/tipoDispositivo",
    tags=["Tipo Dispositivo"]
)

@router.get("/", response_model=list[TipoDispositivoRead])
def listar_tipos(db: Session = Depends(get_db)):
    return tipo_service.get_all(db)

@router.get("/{id}", response_model=TipoDispositivoRead)
def obtener_tipo(id: int, db: Session = Depends(get_db)):
    tipo = tipo_service.get_by_id(db, id)
    if not tipo:
        raise HTTPException(status_code=404, detail="Tipo de dispositivo no encontrado")
    return tipo

@router.post("/", response_model=TipoDispositivoRead)
def crear_tipo(tipo_data: TipoDispositivoCreate, db: Session = Depends(get_db)):
    return tipo_service.create(db, tipo_data)

@router.delete("/{id}", status_code=204)
def eliminar_tipo(id: int, db: Session = Depends(get_db)):
    success = tipo_service.delete(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="Tipo de dispositivo no encontrado")
