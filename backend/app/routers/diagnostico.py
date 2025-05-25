from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from fastapi_pagination import Page, add_pagination
from fastapi_pagination.ext.sqlalchemy import paginate
from app.schemas import diagnostico as schemas
from app.services import diagnostico as services
from app.database import get_db

router = APIRouter(prefix="/diagnosticos", tags=["Diagnósticos"])

@router.get("/", response_model=Page[schemas.Diagnosticos], summary="Obtener lista de diagnosticos")
def read_repuestos(db: Session = Depends(get_db)):
    return paginate(services.obtener_diagnosticos(db))
