from pydantic import BaseModel, Field
from app.schemas.persona import PersonaCreate, PersonaOut


class ClienteBase(BaseModel):
    observaciones: str | None = None
    persona: PersonaCreate | None = None

class ClienteCreate(ClienteBase):
    pass

class ClienteUpdate(ClienteBase):
    pass

class ClienteOut(ClienteBase):
    idCliente: int
    persona: PersonaOut

    class Config:
        orm_mode = True
