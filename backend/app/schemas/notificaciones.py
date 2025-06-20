from pydantic import BaseModel
from datetime import date
from datetime import datetime 

class Notificacion(BaseModel):
    idActividad: int
    tipo: str
    mensaje: str
    fecha: date
    accion: str

    class Config:
        orm_mode = True