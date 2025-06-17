from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate

from app.database import get_db
from app.schemas import empleado as schemas
from app.services import empleado as services
from app.models import Empleado, Perfil, AsignacionUsuarioPermisos, PermisoPerfil

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
def create_empleado(
    empleado_data: schemas.EmpleadoCreate,
    db: Session = Depends(get_db) 
):
    return services.create_empleado(db, empleado_data)


@router.put("/{idEmpleado}", response_model=schemas.EmpleadoOut, summary="Actualizar empleado existente")
def update_empleado(
    idEmpleado: int,
    empleado_data: schemas.EmpleadoUpdate,
    db: Session = Depends(get_db)
):
    db_empleado = db.query(Empleado).filter(Empleado.idEmpleado == idEmpleado).first()
    if not db_empleado:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")

    if empleado_data.fechaContratacion is not None:
        db_empleado.fechaContratacion = empleado_data.fechaContratacion
    if empleado_data.idpuestoLaboral is not None:
        db_empleado.idpuestoLaboral = empleado_data.idpuestoLaboral

    if empleado_data.perfiles is not None:
        usuario = db_empleado.usuario
        if not usuario:
            raise HTTPException(status_code=400, detail="El empleado no tiene usuario asociado")

        # Borrar asignaciones actuales para ese usuario
        db.query(AsignacionUsuarioPermisos).filter(
            AsignacionUsuarioPermisos.idUsuario == usuario.idUsuario
        ).delete()

        # Para cada perfil, obtener los permisos asociados (PermisoPerfil)
        permisos_perfil = db.query(PermisoPerfil).filter(
            PermisoPerfil.idPerfil.in_(empleado_data.perfiles)
        ).all()

        # Crear asignaciones por cada permisoPerfil encontrado
        for permiso_perfil in permisos_perfil:
            asignacion = AsignacionUsuarioPermisos(
                idUsuario=usuario.idUsuario,
                idpermisoPerfil=permiso_perfil.idpermisoPerfil
            )
            db.add(asignacion)

    db.commit()
    db.refresh(db_empleado)
    return db_empleado


@router.delete("/{idEmpleado}", status_code=status.HTTP_204_NO_CONTENT, summary="Eliminar empleado (borrado lógico)")
def delete_empleado(idEmpleado: int, db: Session = Depends(get_db)):
    empleado = services.delete_empleado(db, idEmpleado)
    if empleado is None:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    return None