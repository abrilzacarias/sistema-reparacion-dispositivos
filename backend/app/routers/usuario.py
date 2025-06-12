from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.usuario import (
    UsuarioCreate,
    UsuarioUpdate,
    UsuarioOut,
    UsuarioAutoCreate,
    UsuarioAutoCreateResponse
)
from app.services import usuario as services

router = APIRouter(
    prefix="/usuarios",
    tags=["usuarios"]
)
from app.schemas.usuario import ResetPasswordRequest

@router.get("/", response_model=List[UsuarioOut])
def listar_usuarios(search: str = None, db: Session = Depends(get_db)):
    return services.get_users(db, search).all()

@router.post("/recuperar-password")
def recuperar_password(email: str = Body(..., embed=True), db: Session = Depends(get_db)):
    return services.recover_password(db, email)

@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    try:
        services.reset_password(db, data.token, data.nueva_password)
        return {"msg": "Contraseña actualizada correctamente."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{usuario_id}", response_model=UsuarioOut)
def obtener_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = services.get_user(db, usuario_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@router.post("/", response_model=UsuarioOut, status_code=status.HTTP_201_CREATED)
def crear_usuario_manual(usuario_in: UsuarioCreate, db: Session = Depends(get_db)):
    return services.create_user_manual(db, usuario_in)

@router.post("/auto", response_model=UsuarioAutoCreateResponse, status_code=status.HTTP_201_CREATED)
def crear_usuario_automatico(usuario_in: UsuarioAutoCreate, db: Session = Depends(get_db)):
    try:
        usuario, message = services.create_user_auto(db, usuario_in)
        return UsuarioAutoCreateResponse(
            idUsuario=usuario.idUsuario,
            username=usuario.username,
            email=usuario.email,
            needs_password_change=usuario.needs_password_change,
            message=message
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear usuario: {str(e)}")

@router.put("/{usuario_id}", response_model=UsuarioOut)
def actualizar_usuario(usuario_id: int, usuario_in: UsuarioUpdate, db: Session = Depends(get_db)):
    usuario = services.update_user(db, usuario_id, usuario_in)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@router.delete("/{usuario_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_usuario(usuario_id: int, db: Session = Depends(get_db)):
    if not services.delete_user(db, usuario_id):
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return None

