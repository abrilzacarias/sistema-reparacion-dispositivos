from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from app.schemas.dispositivo import DispositivoSchema, DispositivoCreate
from app.services import dispositivo as dispositivo_service
from app.database import get_db

router = APIRouter(
    prefix="/dispositivo",
    tags=["Dispositivo"]
)

@router.get("/", response_model=list[DispositivoSchema])
def listar_dispositivos(db: Session = Depends(get_db)):
    return dispositivo_service.get_all(db)

@router.get("/{id}", response_model=DispositivoSchema)
def obtener_dispositivo(id: int, db: Session = Depends(get_db)):
    dispositivo = dispositivo_service.get_by_id(db, id)
    if not dispositivo:
        raise HTTPException(status_code=404, detail="Dispositivo no encontrado")
    return dispositivo

@router.post("/", response_model=DispositivoSchema)
def crear_dispositivo(dispositivo_data: DispositivoCreate, db: Session = Depends(get_db)):
    return dispositivo_service.create(db, dispositivo_data)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_dispositivo(id: int, db: Session = Depends(get_db)):
    success = dispositivo_service.delete(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="Dispositivo no encontrado o ya eliminado")
    return Response(status_code=status.HTTP_204_NO_CONTENT)
