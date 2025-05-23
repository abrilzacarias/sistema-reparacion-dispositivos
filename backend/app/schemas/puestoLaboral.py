from pydantic import BaseModel
from typing import Optional

class PuestoLaboralBase(BaseModel):
    nombrepuestoLaboral: Optional[str] = None

class PuestoLaboralCreate(PuestoLaboralBase):
    pass

class PuestoLaboralUpdate(PuestoLaboralBase):
    pass

class PuestoLaboralOut(PuestoLaboralBase):
    idpuestoLaboral: int

    class Config:
        orm_mode = True
