from sqlalchemy import Column, Integer, String, text
from app.database import Base
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.dialects.mysql import TINYINT

class Perfil(Base):
    __tablename__ = "perfil"

    idPerfil = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombrePerfil = Column(String(45), nullable=False)
    estadoPerfil = mapped_column(TINYINT, server_default=text("'1'"))
    
    permisoPerfil = relationship('PermisoPerfil', back_populates='perfil')
