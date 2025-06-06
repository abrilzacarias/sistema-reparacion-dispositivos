from sqlalchemy.orm import Session
from app.models import ModuloSistema
from app.schemas import moduloSistema as schemas

def get_modulos_sistema(db: Session, skip: int = 0, limit: int = 100):
    return db.query(ModuloSistema).filter(ModuloSistema.estadoModuloSistema == True)
    #return db.query(ModuloSistema).offset(skip).limit(limit).all()

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