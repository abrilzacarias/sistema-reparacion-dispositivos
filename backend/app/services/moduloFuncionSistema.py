from sqlalchemy.orm import Session, joinedload
from app.models import ModuloFuncionSistema, ModuloSistema, FuncionSistema
from app.schemas import moduloFuncionSistema as schemas
from typing import List
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


def actualizar_funciones_modulo(db: Session, idmoduloSistema: int, funciones_nuevas: List[int]):
    modulo = db.query(ModuloSistema).filter(ModuloSistema.idmoduloSistema == idmoduloSistema).first()
    if not modulo:
        return None

    actuales = db.query(ModuloFuncionSistema).filter_by(idmoduloSistema=idmoduloSistema).all()
    actuales_ids = set([rel.idfuncionSistema for rel in actuales])
    nuevos_ids = set(funciones_nuevas)

    a_quitar = actuales_ids - nuevos_ids
    a_agregar = nuevos_ids - actuales_ids

    if a_quitar:
        db.query(ModuloFuncionSistema).filter(
            ModuloFuncionSistema.idmoduloSistema == idmoduloSistema,
            ModuloFuncionSistema.idfuncionSistema.in_(a_quitar)
        ).delete(synchronize_session=False)


    for id_funcion in a_agregar:
        funcion = db.query(FuncionSistema).filter(FuncionSistema.idfuncionSistema == id_funcion).first()
        if not funcion:
            continue 

        ruta = f"{modulo.descripcionModuloSistema.lower().replace(' ', '-')}/{funcion.descripcionFuncionSistema.lower().replace(' ', '-')}"
        
        nueva_relacion = ModuloFuncionSistema(
            idmoduloSistema=idmoduloSistema,
            idfuncionSistema=id_funcion,
            rutaModuloFuncionSistema=ruta
        )
        db.add(nueva_relacion)

    db.commit()
    return True

"""
def delete_modulo_funcion(db: Session, id_modulo_funcion: int):
    modulo_funcion = get_modulo_funcion(db, id_modulo_funcion)
    if modulo_funcion:
        db.delete(modulo_funcion)
        db.commit()
        return True
    return False
"""