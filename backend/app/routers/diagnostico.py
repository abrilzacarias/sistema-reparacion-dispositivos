# app/routers/diagnostico.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.diagnostico import *
from app.schemas.diagnostico import DiagnosticoSchema
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate
from app.database import get_db

router = APIRouter(prefix="/diagnostico", tags=["Diagnóstico"])

@router.get("/", response_model=Page[DiagnosticoSchema], summary="Obtener lista de diagnósticos")
def read_diagnosticos(db: Session = Depends(get_db)):
    return paginate(obtener_diagnosticos(db))

# GET: Diagnóstico por ID

# POST: Crear diagnóstico

# PUT: Actualizar diagnóstico

# DELETE: Eliminar diagnóstico
