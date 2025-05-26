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
from app.models import Persona, Usuario, Empleado, PuestoLaboral, MarcaDispositivo, Repuesto, Cliente, Dispositivo, TipoDispositivo, Diagnostico

fake = Faker("es_ES")

# Crear Personas
personas = []
for _ in range(10):
    persona = Persona(
        cuit=fake.unique.random_number(digits=11),
        nombre=fake.first_name(),
        apellido=fake.last_name(),
        fechaNacimiento=fake.date_of_birth(minimum_age=18, maximum_age=60),
        estadoPersona=random.choice([True, False])
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
empleados = []
for i in range(10):
    empleado = Empleado(
        fechaContratacion=fake.date_between(start_date='-2y', end_date='today'),
        fechaFinalizacion=None if random.choice([True, False]) else fake.date_between(start_date='-1y', end_date='today'),
        persona=personas[i],
        usuario=usuarios[i],
        puesto=puestos[i % len(puestos)]
    )
    db.add(empleado)
    empleados.append(empleado)

# Crear Marcas de Dispositivo
marcas = []
for desc in ["Samsung", "LG", "Apple", "Xiaomi", "Huawei", "Motorola", "Sony"]:
    marca = MarcaDispositivo(descripcionMarcaDispositivo=desc)
    db.add(marca)
    marcas.append(marca)

# Crear Tipos de Dispositivo
tipos_dispositivo = []
for nombre in ["Celular", "Tablet", "Notebook", "Smartwatch"]:
    tipo = TipoDispositivo(nombreTipoDispositivo=nombre)
    db.add(tipo)
    tipos_dispositivo.append(tipo)

# Crear Clientes y Dispositivos asociados
clientes = []
dispositivos = []
for i in range(10):
    cliente = Cliente(
        observaciones=fake.sentence(),
        persona=personas[i]
    )
    db.add(cliente)
    clientes.append(cliente)

    dispositivo = Dispositivo(
        descripcionDispositivo=fake.text(max_nb_chars=40),
        modeloDispositivo=fake.word().capitalize(),
        marcaDispositivo=random.choice(marcas),
        tipoDispositivo=random.choice(tipos_dispositivo),
        cliente=cliente
    )
    db.add(dispositivo)
    dispositivos.append(dispositivo)
    
db.commit() 
# Crear Diagnósticos
for i in range(10):
    diagnostico = Diagnostico(
        fechaDiagnostico=fake.date_between(start_date='-1y', end_date='today'),
        dispositivo=dispositivos[i],
        idEmpleado=random.choice(empleados).idEmpleado
    )
    db.add(diagnostico)
""" 
# Crear Tipos de Repuesto
tipos_repuesto = []
for nombre in ["Pantalla", "Batería", "Placa Madre"]:
    tipo = TipoRepuesto(nombreTipoRepuesto=nombre)
    db.add(tipo)
    tipos_repuesto.append(tipo)

db.commit()  # Importante para que tengan ID antes de usarlos

# Crear Repuestos
for _ in range(10):
    tipo = random.choice(tipos_repuesto)
    repuesto = Repuesto(
        nombreRepuesto=fake.word().capitalize(),
        tipoRepuesto=tipo.nombreTipoRepuesto,
        precio=round(random.uniform(1000, 50000), 2),
        cantidadRepuesto=random.randint(1, 100),
        marca=marcas[random.randint(0, len(marcas) - 1)],
        tipo=tipo  
    )
    db.add(repuesto)
 """
# Guardar todo    
db.commit()
db.close()
