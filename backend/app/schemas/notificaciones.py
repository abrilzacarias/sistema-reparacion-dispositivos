from pydantic import BaseModel
from datetime import date
from datetime import datetime 

class Notificacion(BaseModel):
    idActividad: int
    tipo: str
    mensaje: str
    fecha: datetime
    accion: str

    class Config:
        orm_mode = True