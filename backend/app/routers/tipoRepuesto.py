from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas import tipoRepuesto as schemas
from app.models import tipoRepuesto as models

router = APIRouter(prefix="/tipos-repuesto", tags=["Tipos de Repuesto"])

# Obtener todos los tipos de repuesto
@router.get("/", response_model=List[schemas.TipoRepuestoOut], summary="Listar todos los tipos de repuesto")
def read_tipos_repuesto(db: Session = Depends(get_db)):
    return db.query(models.TipoRepuesto).all()

# Obtener tipo de repuesto por ID
@router.get("/{idTipoRepuesto}", response_model=schemas.TipoRepuestoOut, summary="Obtener tipo de repuesto por ID")
def read_tipo_repuesto(idTipoRepuesto: int, db: Session = Depends(get_db)):
    tipo = db.query(models.TipoRepuesto).filter(models.TipoRepuesto.idTipoRepuesto == idTipoRepuesto).first()
    if not tipo:
        raise HTTPException(status_code=404, detail="Tipo de repuesto no encontrado")
    return tipo

# Crear nuevo tipo de repuesto
@router.post("/", response_model=schemas.TipoRepuestoOut, status_code=status.HTTP_201_CREATED, summary="Crear nuevo tipo de repuesto")
def create_tipo_repuesto(tipo: schemas.TipoRepuestoCreate, db: Session = Depends(get_db)):
    nuevo_tipo = models.TipoRepuesto(**tipo.dict())
    db.add(nuevo_tipo)
    db.commit()
    db.refresh(nuevo_tipo)
    return nuevo_tipo

# Actualizar tipo de repuesto
@router.put("/{idTipoRepuesto}", response_model=schemas.TipoRepuestoOut, summary="Actualizar tipo de repuesto")
def update_tipo_repuesto(idTipoRepuesto: int, tipo: schemas.TipoRepuestoCreate, db: Session = Depends(get_db)):
    tipo_db = db.query(models.TipoRepuesto).filter(models.TipoRepuesto.idTipoRepuesto == idTipoRepuesto).first()
    if not tipo_db:
        raise HTTPException(status_code=404, detail="Tipo de repuesto no encontrado")
    for key, value in tipo.dict().items():
        setattr(tipo_db, key, value)
    db.commit()
    db.refresh(tipo_db)
    return tipo_db

# Eliminar tipo de repuesto
@router.delete("/{idTipoRepuesto}", status_code=status.HTTP_204_NO_CONTENT, summary="Eliminar tipo de repuesto")
def delete_tipo_repuesto(idTipoRepuesto: int, db: Session = Depends(get_db)):
    tipo = db.query(models.TipoRepuesto).filter(models.TipoRepuesto.idTipoRepuesto == idTipoRepuesto).first()
    if not tipo:
        raise HTTPException(status_code=404, detail="Tipo de repuesto no encontrado")
    db.delete(tipo)
    db.commit()
