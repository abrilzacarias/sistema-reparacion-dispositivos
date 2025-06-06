import re
import random
import string
from passlib.context import CryptContext
import string
import secrets

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