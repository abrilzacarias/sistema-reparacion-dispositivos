from fastapi import FastAPI
from app import models, database
from app.routers import persona, auth, repuesto, marcaDispositivo
from fastapi.middleware.cors import CORSMiddleware

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

