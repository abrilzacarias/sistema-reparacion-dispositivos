from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from app.models.empleado import Empleado
from app.models import Persona, Perfil, PermisoPerfil, AsignacionUsuarioPermisos
from app.schemas.empleado import EmpleadoCreate, EmpleadoUpdate
from fastapi import Depends, HTTPException, status

from sqlalchemy import or_, func

def get_empleados(db: Session, search: str = None):
    query = db.query(Empleado)
    if search:
        search = f"%{search.lower()}%"
        query = query.filter(
            or_(
                func.lower(Empleado.nombre).like(search),
                func.lower(Empleado.apellido).like(search)
            )
        )
    return query

def get_empleado(db: Session, idEmpleado: int):
    return db.query(Empleado).filter(Empleado.idEmpleado == idEmpleado).first()

def create_empleado(db: Session, empleado_data: EmpleadoCreate):
    nuevo_empleado = Empleado(
        fechaContratacion=empleado_data.fechaContratacion,
        idUsuario=empleado_data.idUsuario,
        idpuestoLaboral=empleado_data.idpuestoLaboral,
        idPersona=empleado_data.idPersona,
    )
    db.add(nuevo_empleado)
    db.flush() 
    
    permisos = db.query(PermisoPerfil).filter(
        PermisoPerfil.idPerfil.in_(empleado_data.perfiles)
    ).all()
    
    for permiso in permisos:
        asignacion = AsignacionUsuarioPermisos(
            idUsuario=empleado_data.idUsuario,
            idpermisoPerfil=permiso.idpermisoPerfil,
            estadoAsignacionUsuarioPermisos=1
        )
        db.add(asignacion)
    
    db.commit()
    db.refresh(nuevo_empleado)
    return nuevo_empleado


def update_empleado(db: Session, idEmpleado: int, empleado: EmpleadoUpdate):
    db_empleado = get_empleado(db, idEmpleado)
    if db_empleado is None:
        return None
    for field, value in empleado.dict(exclude_unset=True).items():
        setattr(db_empleado, field, value)
    db.commit()
    db.refresh(db_empleado)
    return db_empleado

def delete_empleado(db: Session, idEmpleado: int):
    empleado = db.query(Empleado).filter(Empleado.idEmpleado == idEmpleado).first()
    if not empleado:
        return None
    
    persona = db.query(Persona).filter(Persona.idPersona == empleado.idPersona).first()
    if not persona:
        raise HTTPException(status_code=404, detail="Persona relacionada no encontrada")

    persona.estadoPersona = 0

    db.commit()
    return empleado