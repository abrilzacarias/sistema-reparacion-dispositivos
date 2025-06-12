from app.core.config import settings
from app.services.whatsapp import enviar_whatsapp

if __name__ == "__main__":
    numero_destino = "5491123456789"  # Cambialo por el número real al que querés enviar el mensaje, con código país y sin signos.
    mensaje = "¡Hola! Este es un mensaje de prueba enviado desde FastAPI."

    enviar_whatsapp(numero_destino, mensaje)
