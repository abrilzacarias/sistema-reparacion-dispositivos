from sqlalchemy import Column, Integer, ForeignKey, Date
from sqlalchemy.orm import relationship, Mapped
from app.database import Base

class Diagnostico(Base):
    __tablename__ = "diagnostico"

    idDiagnostico = Column(Integer, primary_key=True, index=True)
    fechaDiagnostico = Column(Date, nullable=False)

    # Recibe de Dispositivo, Empleado
    idDispositivo = Column(Integer, ForeignKey('dispositivo.idDispositivo'), nullable=False)
    dispositivo = relationship("Dispositivo", back_populates="diagnosticos")

    idEmpleado = Column(Integer, ForeignKey('empleado.idEmpleado'), nullable=False)
    empleado = relationship("Empleado", back_populates="diagnosticos")
    reparaciones = relationship("Reparacion", back_populates="diagnostico")

    detalleDiagnostico = relationship(
        "DetalleDiagnostico", back_populates="diagnostico", cascade="all, delete-orphan"
    )