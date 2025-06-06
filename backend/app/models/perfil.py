from sqlalchemy import Column, Integer, String
from app.database import Base
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
#from app.models.permisoPerfil import PermisoPerfil

class Perfil(Base):
    __tablename__ = "perfil"

    idPerfil = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombrePerfil = Column(String(45), nullable=False)
    
    permisoPerfil = relationship('PermisoPerfil', back_populates='perfil')  # sin comillas
