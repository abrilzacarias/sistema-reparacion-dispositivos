from pydantic import BaseModel


class TipoDomicilioBase(BaseModel):
    descripciontipoDomicilio: str

class TipoDomicilioCreate(TipoDomicilioBase):
    pass

class TipoDomicilioUpdate(TipoDomicilioBase):
    pass

class TipoDomicilioOut(TipoDomicilioBase):
    idtipoDomicilio: int

    class Config:
        orm_mode = True
