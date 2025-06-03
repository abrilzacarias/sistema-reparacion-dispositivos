from fastapi import FastAPI
from app import models, database
from app.routers import persona, auth, cliente, repuesto, marcaDispositivo, empleado, domicilio, tipoDomicilio, diagnostico, tipoRepuesto, perfil, contacto, tipoContacto
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination
from app.routers import puestoLaboral

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(persona.router)
app.include_router(repuesto.router)
app.include_router(marcaDispositivo.router)
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

add_pagination(app)
