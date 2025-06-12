import re
import string
from passlib.context import CryptContext
import string
import secrets
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

from pathlib import Path
env_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=env_path)
print("Cargando .env desde:", env_path)
print("Ruta __file__:", __file__)
print("Ruta absoluta __file__:", Path(__file__).resolve())

SMTP_SERVER = os.getenv("SMTP_SERVER")      
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
print('hola')
print(SMTP_USER)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def generate_username_from_email(email: str) -> str:
    base = email.split('@')[0]
    username = re.sub(r'[^a-zA-Z0-9]', '', base)
    return username

def generate_random_password(length: int = 8) -> str:
    characters = string.ascii_letters + string.digits + "!@#"
    password = ''.join(secrets.choice(characters) for _ in range(length))
    return password

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def send_email_creds(email, password):
    asunto = "Credenciales de acceso a la plataforma"
    cuerpo = f"""
Hola,

Tu cuenta ha sido creada exitosamente. Estas son tus credenciales de acceso:

Usuario: {email}
Contraseña: {password}

Por favor, cambia tu contraseña al iniciar sesión.

Saludos.
    """

    mensaje = MIMEMultipart()
    mensaje["From"] = SMTP_USER
    mensaje["To"] = email
    mensaje["Subject"] = asunto
    mensaje.attach(MIMEText(cuerpo, "plain"))

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as servidor:
            servidor.ehlo() 
            servidor.starttls()
            servidor.ehlo() 
            servidor.login(SMTP_USER, SMTP_PASSWORD)
            servidor.sendmail(SMTP_USER, email, mensaje.as_string())
        return True
    except Exception as e:
        print("Error al enviar el email:", e)
        return False

def send_email_recover(email, password):
    asunto = "Restablecimiento de contraseña"
    cuerpo = f"""
Hola,

Has solicitado restablecer tu contraseña. Para crear una nueva, hacé clic en el siguiente enlace:


🔗 {password}

Este enlace es válido por un tiempo limitado y solo puede usarse una vez.

Si no solicitaste este cambio, por favor ignorá este mensaje.

Saludos.
    """

    mensaje = MIMEMultipart()
    mensaje["From"] = SMTP_USER
    mensaje["To"] = email
    mensaje["Subject"] = asunto
    mensaje.attach(MIMEText(cuerpo, "plain"))

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as servidor:
            servidor.ehlo() 
            servidor.starttls()
            servidor.ehlo() 
            servidor.login(SMTP_USER, SMTP_PASSWORD)
            servidor.sendmail(SMTP_USER, email, mensaje.as_string())
        return True
    except Exception as e:
        print("Error al enviar el email:", e)
        return False
