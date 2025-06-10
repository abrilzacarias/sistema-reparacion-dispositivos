from pydantic import BaseModel, EmailStr, Field, validator
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

class PasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str

    @validator('new_password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('La contraseña debe tener al menos 8 caracteres')
        if not any(c.isupper() for c in v):
            raise ValueError('La contraseña debe contener al menos una letra mayúscula')
        if not any(c.isdigit() for c in v):
            raise ValueError('La contraseña debe contener al menos un número')
        if not any(c in '!@#$%^&*()_+-=[]{}|;:,.<>?' for c in v):
            raise ValueError('La contraseña debe contener al menos un carácter especial')
        return v

class UsuarioOut(UsuarioBase):
    idUsuario: int
    needs_password_change: bool

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

class UsuarioAutoCreateResponse(BaseModel):
    idUsuario: int
    username: str
    email: EmailStr
    needs_password_change: bool
    message: str

    class Config:
        orm_mode = True

class ModuloFuncionOut(BaseModel):
    modulo: str
    funcion: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UsuarioOut
    permisos: List[PermisoAgrupado]
