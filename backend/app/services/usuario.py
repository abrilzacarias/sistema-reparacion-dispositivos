from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from app.models.usuario import Usuario
from app.schemas.usuario import UsuarioCreate, UsuarioUpdate

def get_user(db: Session, id_usuario: int):
    return db.query(Usuario).filter(Usuario.id == id_usuario).first()

def get_users(db: Session, search: str = None):
    query = db.query(Usuario)
    if search:
        search = f"%{search.lower()}%"
        query = query.filter(
            or_(
                func.lower(Usuario.username).like(search),
                func.lower(Usuario.email).like(search)
            )
        )
    return query

def create_user(db: Session, user_in: UsuarioCreate):
    db_user = Usuario(
        username=user_in.username,
        email=user_in.email,
        password=user_in.password 
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, id_usuario: int, user_in: UsuarioUpdate):
    db_user = get_user(db, id_usuario)
    if not db_user:
        return None
    for key, value in user_in.dict(exclude_unset=True).items():
        setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, id_usuario: int) -> bool:
    user = get_user(db, id_usuario)
    if not user:
        return False
    user.is_active = False
    db.commit()
    return True
