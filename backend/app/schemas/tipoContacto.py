from pydantic import BaseModel

class TipoContactoBase(BaseModel):
    descripcionTipoContacto: str

class TipoContactoCreate(TipoContactoBase):
    pass

class TipoContactoUpdate(TipoContactoBase):
    pass

class TipoContactoOut(TipoContactoBase):
    idtipoContacto: int

    class Config:
        orm_mode = True