from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from app.services.preguntaDiagnostico import verificarTipoDatoPregunta
from app.models.preguntaDiagnostico import PreguntaDiagnostico
from app.schemas.preguntaDiagnostico import (
    PreguntaDiagnosticoCreate,
    PreguntaDiagnosticoOut,
    PreguntaDiagnosticoUpdate
)
from app.database import get_db

router = APIRouter(
    prefix="/preguntasDiagnostico",
    tags=["preguntasDiagnostico"]
)

@router.get("/", response_model=List[PreguntaDiagnosticoOut])
def get_all(db: Session = Depends(get_db)):
    return db.query(PreguntaDiagnostico).all()

@router.get("/{idPreguntaDiagnostico}", response_model=PreguntaDiagnosticoOut)
def get_by_id(idPreguntaDiagnostico: int, db: Session = Depends(get_db)):
    pregunta = db.query(PreguntaDiagnostico).filter(PreguntaDiagnostico.idPreguntaDiagnostico == idPreguntaDiagnostico).first()
    if not pregunta:
        raise HTTPException(status_code=404, detail="Pregunta no encontrada")
    return pregunta

@router.post("/", response_model=PreguntaDiagnosticoOut)
def create(pregunta: PreguntaDiagnosticoCreate, db: Session = Depends(get_db)):
    nueva_pregunta = PreguntaDiagnostico(**pregunta.dict())
    db.add(nueva_pregunta)
    db.commit()
    db.refresh(nueva_pregunta)
    return nueva_pregunta

@router.put("/{idPreguntaDiagnostico}", response_model=PreguntaDiagnosticoOut)
def update(idPreguntaDiagnostico: int, datos: PreguntaDiagnosticoUpdate, db: Session = Depends(get_db)):
    pregunta = db.query(PreguntaDiagnostico).filter(PreguntaDiagnostico.idPreguntaDiagnostico == idPreguntaDiagnostico).first()
    if not pregunta:
        raise HTTPException(status_code=404, detail="Pregunta no encontrada")

    for key, value in datos.dict().items():
        setattr(pregunta, key, value)

    db.commit()
    db.refresh(pregunta)
    return pregunta

@router.delete("/{idPreguntaDiagnostico}")
def delete(idPreguntaDiagnostico: int, db: Session = Depends(get_db)):
    pregunta = db.query(PreguntaDiagnostico).filter(PreguntaDiagnostico.idPreguntaDiagnostico == idPreguntaDiagnostico).first()
    if not pregunta:
        raise HTTPException(status_code=404, detail="Pregunta no encontrada")

    db.delete(pregunta)
    db.commit()
    return {"detail": "Pregunta eliminada correctamente"}

@router.post("/preguntasDiagnostico/")
def crear_pregunta(pregunta: PreguntaDiagnosticoCreate, db: Session = Depends(get_db)):
    verificarTipoDatoPregunta(pregunta.idTipoDatoPreguntaDiagnostico, db)

    nueva_pregunta = PreguntaDiagnostico(
        descripcionPreguntaDiagnostico=pregunta.descripcionPreguntaDiagnostico,
        idTipoDatoPreguntaDiagnostico=pregunta.idTipoDatoPreguntaDiagnostico,
        opcionesPregunta=pregunta.opcionesPregunta
    )
    db.add(nueva_pregunta)
    db.commit()
    db.refresh(nueva_pregunta)
    return nueva_pregunta