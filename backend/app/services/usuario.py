from sqlalchemy.orm import Session
from fastapi import HTTPException
from sqlalchemy import or_, func
from app.models.usuario import Usuario
from app.schemas.usuario import UsuarioCreate, UsuarioUpdate, UsuarioAutoCreate
from app.utils import generate_username_from_email, generate_random_password, send_email_creds
from app.auth.auth_handler import get_password_hash

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


def create_user_manual(db: Session, user_in: UsuarioCreate):
    hashed_password = get_password_hash(user_in.password)

    db_user = Usuario(
        username=user_in.username,
        email=user_in.email,
        password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_user_auto(db: Session, usuario_in: UsuarioAutoCreate):
    email = usuario_in.email
    username = generate_username_from_email(email)

    existing_user = db.query(Usuario).filter(
        (Usuario.email == email) | (Usuario.username == username)
    ).first()

    if existing_user:
        raise ValueError("Ya existe un usuario con ese correo o nombre de usuario.")
    
    raw_password = generate_random_password()
    hashed_password = get_password_hash(raw_password)

    usuario = Usuario(
        username=username,
        email=email,
        password=hashed_password
    )
    db.add(usuario)

    try:
        enviado = send_email_creds(email, raw_password)
        if not enviado:
            raise ValueError("No se pudo enviar el correo.")

        db.commit()
        db.refresh(usuario)

        return usuario, f"Usuario creado."
    except Exception as e:
        db.rollback()
        raise e 

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
