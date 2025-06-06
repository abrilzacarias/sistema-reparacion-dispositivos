from fastapi import APIRouter, Depends, HTTPException, status
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

@router.get("/", response_model=List[UsuarioOut])
def read_usuarios(search: str = None, db: Session = Depends(get_db)):
    query = services.get_usuarios(db, search)
    return query.all()

@router.get("/{usuario_id}", response_model=UsuarioOut)
def read_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = services.get_usuario(db, usuario_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@router.post("/", response_model=UsuarioOut, status_code=status.HTTP_201_CREATED)
def create_new_usuario(usuario_in: UsuarioCreate, db: Session = Depends(get_db)):
    return services.create_usuario(db, usuario_in)

@router.post("/auto-create/", response_model=UsuarioAutoCreateResponse, status_code=status.HTTP_201_CREATED)
def auto_create_usuario(usuario_in: UsuarioAutoCreate, db: Session = Depends(get_db)):
    try:
        usuario, message = services.create_usuario_auto(db, usuario_in)
        return UsuarioAutoCreateResponse(
            idUsuario=usuario.idUsuario,
            username=usuario.username,
            email=usuario.email,
            message=message
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear usuario: {str(e)}")

@router.put("/{usuario_id}", response_model=UsuarioOut)
def update_existing_usuario(usuario_id: int, usuario_in: UsuarioUpdate, db: Session = Depends(get_db)):
    usuario = services.update_usuario(db, usuario_id, usuario_in)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@router.delete("/{usuario_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_usuario(usuario_id: int, db: Session = Depends(get_db)):
    success = services.delete_usuario(db, usuario_id)
    if not success:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return None
