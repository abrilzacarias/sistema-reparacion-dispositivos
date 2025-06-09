from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.orm import Session
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate
from app.database import get_db
from app.schemas.notificaciones import Notificacion
from app.services.notificaciones import obtener_notificaciones_service

router = APIRouter(prefix="/notificaciones", tags=["Notificaciones"])

@router.get("/notificaciones", response_model=Page[Notificacion])
def obtener_notificaciones(db: Session = Depends(get_db)):
    notificaciones = obtener_notificaciones_service(db)
    return paginate(notificaciones)