from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from .permisoPerfil import PermisoAgrupado

class UsuarioBase(BaseModel):
    username: str = Field(..., example="juanperez")
    email: EmailStr = Field(..., example="juan.perez@example.com")

class UsuarioCreate(UsuarioBase):
    password: str = Field(..., example="Password123!")

class UsuarioUpdate(BaseModel):
    username: Optional[str] = Field(None, example="juanperez")
    email: Optional[EmailStr] = Field(None, example="juan.perez@example.com")
    password: Optional[str] = Field(None, example="NewPassword123!")

class UsuarioOut(UsuarioBase):
    idUsuario: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UserResponse(BaseModel):
    username: str
    email: str | None = None

class UsuarioAutoCreate(BaseModel):
    email: EmailStr = Field(..., example="juan.perez@example.com")

class UsuarioAutoCreateResponse(UsuarioOut):
    message: str = Field(..., example="Usuario creado y credenciales enviadas por email")

class ModuloFuncionOut(BaseModel):
    modulo: str
    funcion: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UsuarioOut
    permisos: List[PermisoAgrupado]
