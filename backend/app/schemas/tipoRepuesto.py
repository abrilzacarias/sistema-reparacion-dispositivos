# app/schemas/tipo_repuesto.py
from pydantic import BaseModel, Field

class TipoRepuestoBase(BaseModel):
    descripcionTipoRepuesto: str = Field(..., example="Pantalla")  


class TipoRepuestoCreate(TipoRepuestoBase):
    pass

class TipoRepuestoOut(TipoRepuestoBase):
    idTipoRepuesto: int

    class Config:
        from_attributes = True
