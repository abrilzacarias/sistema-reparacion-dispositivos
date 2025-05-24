import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from faker import Faker
import random

# para CORRER
# docker exec -it fastapi sh                             
# cd /app
# python -m app.scriptFakerDb
basedir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
load_dotenv(os.path.join(basedir, '.env'))

DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')

if not all([DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME]):
    raise Exception("Faltan variables de entorno para la base de datos")

# Crear URL para MySQL con pymysql
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Crear engine y sesión
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
db = SessionLocal()

# Importar modelos después de configurar db
from app.models import Persona, Usuario, Empleado, PuestoLaboral, MarcaDispositivo, Repuesto

fake = Faker("es_ES")

# Ejemplo para crear personas
personas = []
for _ in range(10):
    persona = Persona(
        cuit=fake.unique.random_number(digits=11),
        nombre=fake.first_name(),
        apellido=fake.last_name(),
        fechaNacimiento=fake.date_of_birth(minimum_age=18, maximum_age=60)
    )
    db.add(persona)
    personas.append(persona)

db.commit()
db.close()

# Crear Personas
personas = []
for _ in range(10):
    persona = Persona(
        cuit=fake.unique.random_number(digits=11),
        nombre=fake.first_name(),
        apellido=fake.last_name(),
        fechaNacimiento=fake.date_of_birth(minimum_age=18, maximum_age=60)
    )
    db.add(persona)
    personas.append(persona)

# Crear Usuarios
usuarios = []
for _ in range(10):
    usuario = Usuario(
        username=fake.user_name(),
        password="hashed_password",
        email=fake.unique.email()
    )
    db.add(usuario)
    usuarios.append(usuario)

# Crear Puestos Laborales (asumido simple)
puestos = []
for nombre in ["Técnico", "Administrador", "Vendedor"]:
    puesto = PuestoLaboral(nombrepuestoLaboral=nombre)
    db.add(puesto)
    puestos.append(puesto)

# Crear Empleados
for i in range(10):
    empleado = Empleado(
        fechaContratacion=fake.date_between(start_date='-2y', end_date='today'),
        fechaFinalizacion=None if random.choice([True, False]) else fake.date_between(start_date='-1y', end_date='today'),
        estadoLaboral=random.choice(["Activo", "Inactivo"]),
        persona=personas[i],
        usuario=usuarios[i],
        puesto=puestos[i % len(puestos)]
    )
    db.add(empleado)

# Crear Marcas de Dispositivo
marcas = []
for desc in ["Samsung", "LG", "Apple"]:
    marca = MarcaDispositivo(descripcionMarcaDispositivo=desc)
    db.add(marca)
    marcas.append(marca)

# Crear Repuestos
for _ in range(10):
    repuesto = Repuesto(
        nombreRepuesto=fake.word().capitalize(),
        tipoRepuesto=random.choice(["Pantalla", "Batería", "Placa Madre"]),
        precio=round(random.uniform(1000, 50000), 2),
        cantidadRepuesto=random.randint(1, 100),
        marca=marcas[random.randint(0, len(marcas) - 1)]
    )
    db.add(repuesto)

# Guardar todo
db.commit()
db.close()
