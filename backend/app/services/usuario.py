from sqlalchemy.orm import Session
from fastapi import HTTPException
from sqlalchemy import or_, func
from app.models.usuario import Usuario
from app.schemas.usuario import UsuarioCreate, UsuarioUpdate, UsuarioAutoCreate
from app.utils import generate_username_from_email, generate_random_password, send_email_creds, send_email_recover
from app.auth.auth_handler import get_password_hash
from datetime import datetime, timedelta
import jwt  # pyjwt
from jwt import PyJWTError

# Clave secreta para firmar el JWT (debería estar en .env o config)
SECRET_KEY = "tu_clave_super_secreta"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 1


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_user(db: Session, id_usuario: int):
    return db.query(Usuario).filter(Usuario.idUsuario == id_usuario).first()


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


def recover_password(db: Session, email: str):
    usuario = db.query(Usuario).filter(Usuario.email == email).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="No se encontró un usuario con ese email.")

    # Generar token JWT con info usuario y expiración
    token_data = {"user_id": usuario.idUsuario, "email": usuario.email}
    token = create_access_token(token_data, expires_delta=timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS))

    # Enviar mail con el enlace que incluye el token
    link = f"http://localhost:5173/usuarios/reset-password?token={token}"
    enviado = send_email_recover(email, link)
    
    if not enviado:
        raise HTTPException(status_code=500, detail="Error al enviar el email.")
    
    return {"msg": "Correo con enlace para recuperar contraseña enviado."}


def reset_password(db: Session, token: str, nueva_password: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=400, detail="Token inválido.")
    except PyJWTError:
        raise HTTPException(status_code=400, detail="Token inválido o expirado.")

    usuario = get_user(db, user_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    usuario.password = get_password_hash(nueva_password)
    db.commit()
    return {"msg": "Contraseña actualizada correctamente."}
