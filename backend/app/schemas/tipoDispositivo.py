from pydantic import BaseModel

class TipoDispositivoBase(BaseModel):
    nombreTipoDispositivo: str

class TipoDispositivoCreate(TipoDispositivoBase):
    pass

class TipoDispositivoRead(TipoDispositivoBase):
    idTipoDispositivo: int

    class Config:
        orm_mode = True
