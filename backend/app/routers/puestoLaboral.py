from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate

from app.schemas import puestoLaboral as schemas
from app.services import puestoLaboral as services
from app.database import get_db

router = APIRouter(prefix="/puestos-laborales", tags=["Puestos Laborales"])

@router.get("/", response_model=Page[schemas.PuestoLaboralOut])
def get_all_puestos(db: Session = Depends(get_db)):
    return paginate(services.get_all_puestos(db))

@router.get("/{idpuestoLaboral}", response_model=schemas.PuestoLaboralOut)
def get_puesto(idpuestoLaboral: int, db: Session = Depends(get_db)):
    puesto = services.get_puesto(db, idpuestoLaboral)
    if not puesto:
        raise HTTPException(status_code=404, detail="Puesto no encontrado")
    return puesto

@router.post("/", response_model=schemas.PuestoLaboralOut, status_code=status.HTTP_201_CREATED)
def create_puesto(puesto: schemas.PuestoLaboralCreate, db: Session = Depends(get_db)):
    return services.create_puesto(db, puesto)

@router.put("/{idpuestoLaboral}", response_model=schemas.PuestoLaboralOut)
def update_puesto(idpuestoLaboral: int, puesto: schemas.PuestoLaboralUpdate, db: Session = Depends(get_db)):
    db_puesto = services.update_puesto(db, idpuestoLaboral, puesto)
    if not db_puesto:
        raise HTTPException(status_code=404, detail="Puesto no encontrado")
    return db_puesto

@router.delete("/{idpuestoLaboral}", status_code=status.HTTP_204_NO_CONTENT)
def delete_puesto(idpuestoLaboral: int, db: Session = Depends(get_db)):
    success = services.delete_puesto(db, idpuestoLaboral)
    if not success:
        raise HTTPException(status_code=404, detail="Puesto no encontrado")
