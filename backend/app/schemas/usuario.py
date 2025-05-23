from pydantic import BaseModel, EmailStr
from typing import Optional


class UsuarioBase(BaseModel):
    username: str
    email: EmailStr


class UsuarioCreate(UsuarioBase):
    password: str


class UsuarioUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None


class UsuarioOut(UsuarioBase):
    idUsuario: int

    class Config:
        orm_mode = True
