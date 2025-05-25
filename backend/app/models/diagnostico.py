from sqlalchemy import Column, Integer, String, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Diagnostico(Base):
    __tablename__ = "diagnostico"

    idDiagnostico = Column(Integer, primary_key=True, index=True)
    fechaDiagnostico = Column(Date, nullable=False)
    
    # Relación con Dispositivo
    idDispositivo = Column(Integer, ForeignKey('dispositivo.idDispositivo'), nullable=False)
    dispositivo = relationship("Dispositivo", back_populates="diagnostico")
    
    # Relación con Empleado
    idEmpleado = Column(Integer, ForeignKey('empleado.idEmpleado'), nullable=False)
    empleado = relationship("Empleado", back_populates="diagnostico")