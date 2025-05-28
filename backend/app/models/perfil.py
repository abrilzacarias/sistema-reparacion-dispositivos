from sqlalchemy import Column, Integer, String
from app.database import Base

class Perfil(Base):
    __tablename__ = "perfil"

    idPerfil = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombrePerfil = Column(String(45), nullable=False)
