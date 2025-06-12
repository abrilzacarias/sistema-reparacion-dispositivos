from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.detalleDiagnostico import DetalleDiagnosticoCreate, DetalleDiagnosticoUpdate, DetalleDiagnosticoOut
from app.services.detalleDiagnostico import (
    get_detalleDiagnostico,
    get_detalleDiagnosticos,
    create_detalleDiagnostico,
    update_detalleDiagnostico,
    delete_detalleDiagnostico,
)
from app.database import get_db

router = APIRouter(prefix="/detalleDiagnostico", tags=["DetalleDiagnostico"])

@router.get("/", response_model=List[DetalleDiagnosticoOut])
def read_detalleDiagnosticos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    detalles = get_detalleDiagnosticos(db, skip=skip, limit=limit)
    return detalles

@router.get("/{detalleDiagnostico_id}", response_model=DetalleDiagnosticoOut)
def read_detalleDiagnostico(detalleDiagnostico_id: int, db: Session = Depends(get_db)):
    detalle = get_detalleDiagnostico(db, detalleDiagnostico_id)
    if not detalle:
        raise HTTPException(status_code=404, detail="DetalleDiagnostico not found")
    return detalle

@router.post("/detalle", response_model=DetalleDiagnosticoOut, status_code=status.HTTP_201_CREATED)
def create_detalle(detalleDiagnostico: DetalleDiagnosticoCreate, db: Session = Depends(get_db)):
    return create_detalleDiagnostico(db, detalleDiagnostico)

@router.put("/{detalleDiagnostico_id}", response_model=DetalleDiagnosticoOut)
def update_detalle(detalleDiagnostico_id: int, detalleDiagnostico: DetalleDiagnosticoUpdate, db: Session = Depends(get_db)):
    detalle = update_detalleDiagnostico(db, detalleDiagnostico_id, detalleDiagnostico)
    if not detalle:
        raise HTTPException(status_code=404, detail="DetalleDiagnostico not found")
    return detalle

@router.delete("/{detalleDiagnostico_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_detalle(detalleDiagnostico_id: int, db: Session = Depends(get_db)):
    success = delete_detalleDiagnostico(db, detalleDiagnostico_id)
    if not success:
        raise HTTPException(status_code=404, detail="DetalleDiagnostico not found")
    return None
