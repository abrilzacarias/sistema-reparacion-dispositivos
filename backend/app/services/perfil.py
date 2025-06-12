from sqlalchemy.orm import Session
from app.models.perfil import Perfil
from app.schemas.perfil import PerfilCreate, PerfilUpdate

def get_perfil(db: Session, idPerfil: int):
    return db.query(Perfil).filter(Perfil.idPerfil == idPerfil).first()

def get_perfiles(db: Session):
    return db.query(Perfil)

def create_perfil(db: Session, perfil: PerfilCreate):
    db_perfil = Perfil(**perfil.dict())
    db.add(db_perfil)
    db.commit()
    db.refresh(db_perfil)
    return db_perfil

def update_perfil(db: Session, idPerfil: int, perfil: PerfilUpdate):
    db_perfil = get_perfil(db, idPerfil)
    if not db_perfil:
        return None
    for key, value in perfil.dict().items():
        setattr(db_perfil, key, value)
    db.commit()
    db.refresh(db_perfil)
    return db_perfil

def delete_perfil(db: Session, idPerfil: int) -> bool:
    db_perfil = get_perfil(db, idPerfil)
    if not db_perfil:
        return False
    db.delete(db_perfil)
    db.commit()
    return True
