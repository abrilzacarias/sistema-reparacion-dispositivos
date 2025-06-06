from sqlalchemy.orm import Session
from app.models import FuncionSistema
from app.schemas import funcionSistema as schemas

def get_funciones_sistema(db: Session, skip: int = 0, limit: int = 100):
    return db.query(FuncionSistema).filter(FuncionSistema.estadoFuncionSistema == True)
    #return db.query(FuncionSistema).offset(skip).limit(limit).all()

def get_funcion_sistema(db: Session, id_funcion: int):
    return db.query(FuncionSistema).filter(FuncionSistema.idfuncionSistema == id_funcion).first()

def create_funcion_sistema(db: Session, funcion: schemas.FuncionSistemaCreate):
    db_funcion = FuncionSistema(**funcion.dict())
    db.add(db_funcion)
    db.commit()
    db.refresh(db_funcion)
    return db_funcion

def update_funcion_sistema(db: Session, id_funcion: int, funcion: schemas.FuncionSistemaUpdate):
    db_funcion = get_funcion_sistema(db, id_funcion)
    if not db_funcion:
        return None
    for key, value in funcion.dict().items():
        setattr(db_funcion, key, value)
    db.commit()
    db.refresh(db_funcion)
    return db_funcion

def delete_funcion_sistema(db: Session, id_funcion: int):
    funcion = db.query(FuncionSistema).filter(FuncionSistema.idfuncionSistema == id_funcion).first()
    if funcion:
        funcion.estadoFuncionSistema = False
        db.commit()
        return True
    return False