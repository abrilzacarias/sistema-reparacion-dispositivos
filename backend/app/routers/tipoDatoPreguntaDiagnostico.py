from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from app.models.tipoDatoPreguntaDiagnostico import TipoDatoPreguntaDiagnostico
from app.schemas.tipoDatoPreguntaDiagnostico import (
    TipoDatoPreguntaDiagnosticoCreate,
    TipoDatoPreguntaDiagnosticoUpdate,
    TipoDatoPreguntaDiagnosticoOut
)
from app.database import get_db

router = APIRouter(
    prefix="/tipoDatoPreguntaDiagnostico",
    tags=["tipoDatoPreguntaDiagnostico"]
)

@router.get("/", response_model=List[TipoDatoPreguntaDiagnosticoOut])
def get_all(db: Session = Depends(get_db)):
    return db.query(TipoDatoPreguntaDiagnostico).all()

@router.get("/{idTipoDatoPreguntaDiagnostico}", response_model=TipoDatoPreguntaDiagnosticoOut)
def get_by_id(idTipoDatoPreguntaDiagnostico: int, db: Session = Depends(get_db)):
    tipo = db.query(TipoDatoPreguntaDiagnostico).filter(
        TipoDatoPreguntaDiagnostico.idTipoDatoPreguntaDiagnostico == idTipoDatoPreguntaDiagnostico
    ).first()
    if not tipo:
        raise HTTPException(status_code=404, detail="Tipo de dato no encontrado")
    return tipo

@router.post("/", response_model=TipoDatoPreguntaDiagnosticoOut)
def create(tipo: TipoDatoPreguntaDiagnosticoCreate, db: Session = Depends(get_db)):
    nuevo_tipo = TipoDatoPreguntaDiagnostico(**tipo.dict())
    db.add(nuevo_tipo)
    db.commit()
    db.refresh(nuevo_tipo)
    return nuevo_tipo

@router.put("/{idTipoDatoPreguntaDiagnostico}", response_model=TipoDatoPreguntaDiagnosticoOut)
def update(idTipoDatoPreguntaDiagnostico: int, datos: TipoDatoPreguntaDiagnosticoUpdate, db: Session = Depends(get_db)):
    tipo = db.query(TipoDatoPreguntaDiagnostico).filter(
        TipoDatoPreguntaDiagnostico.idTipoDatoPreguntaDiagnostico == idTipoDatoPreguntaDiagnostico
    ).first()
    if not tipo:
        raise HTTPException(status_code=404, detail="Tipo de dato no encontrado")

    for key, value in datos.dict().items():
        setattr(tipo, key, value)

    db.commit()
    db.refresh(tipo)
    return tipo

@router.delete("/{idTipoDatoPreguntaDiagnostico}")
def delete(idTipoDatoPreguntaDiagnostico: int, db: Session = Depends(get_db)):
    tipo = db.query(TipoDatoPreguntaDiagnostico).filter(
        TipoDatoPreguntaDiagnostico.idTipoDatoPreguntaDiagnostico == idTipoDatoPreguntaDiagnostico
    ).first()
    if not tipo:
        raise HTTPException(status_code=404, detail="Tipo de dato no encontrado")

    db.delete(tipo)
    db.commit()
    return {"detail": "Tipo de dato eliminado correctamente"}