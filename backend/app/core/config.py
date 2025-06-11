# app/core/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    db_user: str
    db_password: str
    db_host: str
    db_port: int
    db_name: str

    whatsapp_access_token: str
    whatsapp_phone_number_id: str

    class Config:
        env_file = ".env"

settings = Settings()
