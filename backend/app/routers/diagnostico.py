# app/routers/diagnostico.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate
from app.schemas import diagnostico as schemas
from app.services.diagnostico import (
    obtener_diagnosticos,
    get_diagnostico,
    create_diagnostico,
    update_diagnostico,
    delete_diagnostico
)

from app.database import get_db

router = APIRouter(prefix="/diagnostico", tags=["Diagnostico"])

# GET: Lista de diagnósticos
@router.get("/", response_model=Page[schemas.DiagnosticoSchema])
def listar_diagnosticos(db: Session = Depends(get_db)):
    return paginate(obtener_diagnosticos(db))

# GET: Diagnóstico por ID
@router.get("/{idDiagnostico}", response_model=schemas.DiagnosticoSchema)
def obtener_diagnostico(idDiagnostico: int, db: Session = Depends(get_db)):
    diagnostico = get_diagnostico(db, idDiagnostico)
    if not diagnostico:
        raise HTTPException(status_code=404, detail="Diagnóstico no encontrado")
    return diagnostico

# POST: Crear diagnóstico
@router.post("/diagnostico", response_model=schemas.DiagnosticoSchema, status_code=201)
def crear_diagnostico(diagnostico: schemas.DiagnosticoCreate, db: Session = Depends(get_db)):
    return create_diagnostico(db, diagnostico)

# PUT: Actualizar diagnóstico
@router.put("/{idDiagnostico}", response_model=schemas.DiagnosticoSchema)
def actualizar_diagnostico(
    idDiagnostico: int, 
    diagnostico: schemas.DiagnosticoUpdate, 
    db: Session = Depends(get_db)
):
    db_diagnostico = update_diagnostico(db, idDiagnostico, diagnostico)
    if not db_diagnostico:
        raise HTTPException(status_code=404, detail="Diagnóstico no encontrado")
    return db_diagnostico

# DELETE: Eliminar diagnóstico
@router.delete("/{idDiagnostico}", status_code=204)
def eliminar_diagnostico(idDiagnostico: int, db: Session = Depends(get_db)):
    if not delete_diagnostico(db, idDiagnostico):
        raise HTTPException(status_code=404, detail="Diagnóstico no encontrado")