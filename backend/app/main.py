from fastapi import FastAPI
from app import models, database
from app.routers import persona, auth, cliente, repuesto, marcaDispositivo, empleado, domicilio, tipoDomicilio, diagnostico, tipoRepuesto, perfil, estadoReparacion, tipoReparacion, reparacion, tipoDispositivo, dispositivo, detalleReparacion, contacto, tipoContacto, funcionSistema, moduloSistema, moduloFuncionSistema, permisoPerfil, asignacionUsuarioPermisos, usuario, notificaciones, registroEstadoReparacion, historialAsignacionDiagnostico, historialAsignacionReparacion, modeloDispositivo, preguntaDiagnostico, tipoDatoPreguntaDiagnostico, tipoDispositivoSegunPregunta, detalleDiagnostico
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination
from app.routers import puestoLaboral

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:4322",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(persona.router)
app.include_router(usuario.router)
app.include_router(repuesto.router)
app.include_router(marcaDispositivo.router)
app.include_router(modeloDispositivo.router)
app.include_router(auth.router)
app.include_router(empleado.router)
app.include_router(puestoLaboral.router)
app.include_router(cliente.router)
app.include_router(domicilio.router)
app.include_router(tipoDomicilio.router)
app.include_router(tipoRepuesto.router)
app.include_router(perfil.router)
app.include_router(diagnostico.router)
app.include_router(contacto.router)
app.include_router(tipoContacto.router)
app.include_router(estadoReparacion.router)
app.include_router(tipoReparacion.router)
app.include_router(reparacion.router)
app.include_router(tipoDispositivo.router)
app.include_router(dispositivo.router)
app.include_router(detalleReparacion.router)
app.include_router(notificaciones.router)
app.include_router(funcionSistema.router)
app.include_router(moduloSistema.router)
app.include_router(moduloFuncionSistema.router)
app.include_router(permisoPerfil.router)
app.include_router(asignacionUsuarioPermisos.router)
app.include_router(registroEstadoReparacion.router)
app.include_router(historialAsignacionDiagnostico.router)
app.include_router(historialAsignacionReparacion.router)
app.include_router(registroEstadoReparacion.router)




app.include_router(preguntaDiagnostico.router)
app.include_router(tipoDatoPreguntaDiagnostico.router)
app.include_router(tipoDispositivoSegunPregunta.router)
app.include_router(detalleDiagnostico.router)
add_pagination(app)
