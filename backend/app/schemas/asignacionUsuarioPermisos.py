from pydantic import BaseModel

class AsignacionUsuarioPermisosBase(BaseModel):
    idUsuario: int
    idpermisoPerfil: int

class AsignacionUsuarioPermisosCreate(AsignacionUsuarioPermisosBase):
    pass

class AsignacionUsuarioPermisosUpdate(BaseModel):
    idUsuario: int
    idpermisoPerfil: int

class AsignacionUsuarioPermisosOut(BaseModel):
    idasignacionUsuarioPermisos: int
    idUsuario: int
    idpermisoPerfil: int

    class Config:
        orm_mode = True
