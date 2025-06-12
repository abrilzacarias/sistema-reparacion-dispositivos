from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate

from app.database import get_db
from app.schemas import empleado as schemas
from app.services import empleado as services

router = APIRouter(prefix="/empleados", tags=["Empleados"])

@router.get("/", response_model=Page[schemas.EmpleadoOut], summary="Obtener lista paginada de empleados")
def read_empleados(
    search: str = Query(None, description="Buscar empleados por nombre o apellido"),
    db: Session = Depends(get_db)
):
    empleados = services.get_empleados(db, search=search)
    return paginate(empleados)

@router.get("/{idEmpleado}", response_model=schemas.EmpleadoOut, summary="Obtener un empleado por ID")
def read_empleado(idEmpleado: int, db: Session = Depends(get_db)):
    empleado = services.get_empleado(db, idEmpleado)
    if not empleado:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    return empleado

@router.post("/", response_model=schemas.EmpleadoOut, status_code=status.HTTP_201_CREATED, summary="Crear nuevo empleado")
def create_empleado(empleado: schemas.EmpleadoCreate, db: Session = Depends(get_db)):
    return services.create_empleado(db, empleado)

@router.put("/{idEmpleado}", response_model=schemas.EmpleadoOut, summary="Actualizar empleado existente")
def update_empleado(idEmpleado: int, empleado: schemas.EmpleadoUpdate, db: Session = Depends(get_db)):
    updated = services.update_empleado(db, idEmpleado, empleado)
    if not updated:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    return updated

@router.delete("/{idEmpleado}", status_code=status.HTTP_204_NO_CONTENT, summary="Eliminar empleado (borrado lógico)")
def delete_empleado(idEmpleado: int, db: Session = Depends(get_db)):
    empleado = services.delete_empleado(db, idEmpleado)
    if empleado is None:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    return None