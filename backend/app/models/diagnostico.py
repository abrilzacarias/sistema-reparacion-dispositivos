from sqlalchemy import Column, Integer, ForeignKey, Date, String, Boolean
from sqlalchemy.orm import relationship, Mapped
from app.database import Base

class Diagnostico(Base):
    __tablename__ = "diagnostico"

    idDiagnostico = Column(Integer, primary_key=True, index=True)
    fechaDiagnostico = Column(Date, nullable=False)

    # Recibe de Dispositivo, Empleado
    idDispositivo = Column(Integer, ForeignKey('dispositivo.idDispositivo'), nullable=False)
    dispositivo = relationship("Dispositivo", back_populates="diagnosticos")
    descripcionDiagnostico = Column(String(100), nullable=True)
    idEmpleado = Column(Integer, ForeignKey('empleado.idEmpleado'), nullable=True)
    estadoDiagnostico = Column(Boolean, default=True, nullable=False)  # tinyint(1) en SQL = Boolean en SQLAlchemy
    empleado = relationship("Empleado", back_populates="diagnosticos")
    reparaciones = relationship("Reparacion", back_populates="diagnostico")

    historialAsignacionDiagnostico = relationship("HistorialAsignacionDiagnostico", back_populates="diagnostico")
    detalleDiagnostico = relationship(
        "DetalleDiagnostico", back_populates="diagnostico", cascade="all, delete-orphan"
    )
