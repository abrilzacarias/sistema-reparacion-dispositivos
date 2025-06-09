from sqlalchemy.orm import Session, joinedload
from app.models import ModuloFuncionSistema
from app.schemas import moduloFuncionSistema as schemas
from collections import defaultdict

def get_modulos_funcion(db: Session):
    return db.query(ModuloFuncionSistema).options(
        joinedload(ModuloFuncionSistema.moduloSistema),
        joinedload(ModuloFuncionSistema.funcionSistema)
    )

def get_modulo_funcion(db: Session, id_modulo_funcion: int):
    return db.query(ModuloFuncionSistema).filter(ModuloFuncionSistema.idmoduloFuncionSistema == id_modulo_funcion).first()

def create_modulo_funcion(db: Session, modulo_funcion: schemas.ModuloFuncionSistemaCreate):
    db_modulo_funcion = ModuloFuncionSistema(**modulo_funcion.dict())
    db.add(db_modulo_funcion)
    db.commit()
    db.refresh(db_modulo_funcion)
    return db_modulo_funcion

def update_modulo_funcion(db: Session, id_modulo_funcion: int, modulo_funcion: schemas.ModuloFuncionSistemaUpdate):
    db_modulo_funcion = get_modulo_funcion(db, id_modulo_funcion)
    if not db_modulo_funcion:
        return None
    for key, value in modulo_funcion.dict().items():
        setattr(db_modulo_funcion, key, value)
    db.commit()
    db.refresh(db_modulo_funcion)
    return db_modulo_funcion

"""
def delete_modulo_funcion(db: Session, id_modulo_funcion: int):
    modulo_funcion = get_modulo_funcion(db, id_modulo_funcion)
    if modulo_funcion:
        db.delete(modulo_funcion)
        db.commit()
        return True
    return False
"""