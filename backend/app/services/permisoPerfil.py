from sqlalchemy.orm import Session
from app.models.permisoPerfil import PermisoPerfil
from app.schemas import permisoPerfil as schemas

def get_permisos_perfil(db: Session):
    return db.query(PermisoPerfil).filter(PermisoPerfil.estadoPermisoPerfil == 1)

def get_permiso_perfil(db: Session, id_permiso: int):
    return db.query(PermisoPerfil).filter(PermisoPerfil.idpermisoPerfil == id_permiso).first()

def create_permiso_perfil(db: Session, permiso: schemas.PermisoPerfilCreate):
    db_permiso = PermisoPerfil(**permiso.dict())
    db.add(db_permiso)
    db.commit()
    db.refresh(db_permiso)
    return db_permiso

def update_permiso_perfil(db: Session, id_permiso: int, permiso: schemas.PermisoPerfilUpdate):
    db_permiso = get_permiso_perfil(db, id_permiso)
    if not db_permiso:
        return None
    for key, value in permiso.dict(exclude_unset=True).items():
        setattr(db_permiso, key, value)
    db.commit()
    db.refresh(db_permiso)
    return db_permiso

def delete_permiso_perfil(db: Session, id_permiso: int):
    permiso = db.query(PermisoPerfil).filter(PermisoPerfil.idpermisoPerfil == id_permiso).first()
    if permiso:
        permiso.estadoPermisoPerfil = 0
        db.commit()
        return True
    return False
