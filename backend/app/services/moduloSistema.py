from sqlalchemy.orm import Session, joinedload
from app.schemas import moduloSistema as schemas
from app.models import ModuloSistema, ModuloFuncionSistema, FuncionSistema

def get_modulos_sistema(db: Session):
    modulos = db.query(ModuloSistema).options(
        joinedload(ModuloSistema.moduloFuncionSistema).joinedload(ModuloFuncionSistema.funcionSistema)
    ).all()

    # Mapear manualmente funciones por módulo
    resultado = []
    for modulo in modulos:
        funciones = [
            {
                "idfuncionSistema": mf.funcionSistema.idfuncionSistema,
                "descripcionFuncionSistema": mf.funcionSistema.descripcionFuncionSistema,
                "idmoduloFuncionSistema": mf.idmoduloFuncionSistema
            }
            for mf in modulo.moduloFuncionSistema
            if mf.funcionSistema is not None
        ]

        resultado.append({
            "idmoduloSistema": modulo.idmoduloSistema,
            "descripcionModuloSistema": modulo.descripcionModuloSistema,
            "funciones": funciones
        })

    return resultado

def get_modulo_sistema(db: Session, id_modulo: int):
    return db.query(ModuloSistema).filter(ModuloSistema.idmoduloSistema == id_modulo).first()

def create_modulo_sistema(db: Session, modulo: schemas.ModuloSistemaCreate):
    db_modulo = ModuloSistema(**modulo.dict())
    db.add(db_modulo)
    db.commit()
    db.refresh(db_modulo)
    return db_modulo

def update_modulo_sistema(db: Session, id_modulo: int, modulo: schemas.ModuloSistemaUpdate):
    db_modulo = get_modulo_sistema(db, id_modulo)
    if not db_modulo:
        return None
    for key, value in modulo.dict().items():
        setattr(db_modulo, key, value)
    db.commit()
    db.refresh(db_modulo)
    return db_modulo

def delete_modulo_sistema(db: Session, id_modulo: int):
    modulo = db.query(ModuloSistema).filter(ModuloSistema.idmoduloSistema == id_modulo).first()
    if modulo:
        modulo.estadoModuloSistema = False
        db.commit()
        return True
    return False