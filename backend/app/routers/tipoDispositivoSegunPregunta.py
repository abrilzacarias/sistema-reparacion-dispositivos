from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.tipoDispositivoSegunPregunta import *
from app.services import tipoDispositivoSegunPregunta as service
from app.database import get_db

router = APIRouter(prefix="/tipo-dispositivo-segun-pregunta", tags=["TipoDispositivoSegunPregunta"])

@router.get("/", response_model=list[TipoDispositivoSegunPreguntaResponse])
def listar_todos(db: Session = Depends(get_db)):
    return service.get_all(db)

@router.get("/{id}", response_model=TipoDispositivoSegunPreguntaResponse)
def obtener_por_id(id: str, db: Session = Depends(get_db)):
    obj = service.get_by_id(db, id)
    if not obj:
        raise HTTPException(status_code=404, detail="No encontrado")
    return obj

@router.post("/", response_model=TipoDispositivoSegunPreguntaResponse)
def crear(entrada: TipoDispositivoSegunPreguntaCreate, db: Session = Depends(get_db)):
    return service.create(db, entrada)

@router.put("/{id}", response_model=TipoDispositivoSegunPreguntaResponse)
def actualizar(id: str, entrada: TipoDispositivoSegunPreguntaUpdate, db: Session = Depends(get_db)):
    obj = service.update(db, id, entrada)
    if not obj:
        raise HTTPException(status_code=404, detail="No encontrado")
    return obj

@router.delete("/{id}")
def eliminar(id: str, db: Session = Depends(get_db)):
    obj = service.delete(db, id)
    if not obj:
        raise HTTPException(status_code=404, detail="No encontrado")
    return {"message": "Eliminado correctamente"}