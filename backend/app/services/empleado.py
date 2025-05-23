from sqlalchemy.orm import Session
from app.models.empleado import Empleado
from app.schemas.empleado import EmpleadoCreate, EmpleadoUpdate

def get_empleados(db: Session):
    return db.query(Empleado)

def get_empleado(db: Session, idEmpleado: int):
    return db.query(Empleado).filter(Empleado.idEmpleado == idEmpleado).first()

def create_empleado(db: Session, empleado: EmpleadoCreate):
    db_empleado = Empleado(**empleado.dict())
    db.add(db_empleado)
    db.commit()
    db.refresh(db_empleado)
    return db_empleado

def update_empleado(db: Session, idEmpleado: int, empleado: EmpleadoUpdate):
    db_empleado = get_empleado(db, idEmpleado)
    if db_empleado is None:
        return None
    for field, value in empleado.dict(exclude_unset=True).items():
        setattr(db_empleado, field, value)
    db.commit()
    db.refresh(db_empleado)
    return db_empleado
