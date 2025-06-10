import requests
from app.core.config import settings  # donde tengas cargado tu config con BaseSettings

def enviar_whatsapp(numero: str, mensaje: str):
    url = f"https://graph.facebook.com/v19.0/{settings.whatsapp_phone_number_id}/messages"
    headers = {
        "Authorization": f"Bearer {settings.whatsapp_access_token}",
        "Content-Type": "application/json"
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": numero,
        "type": "text",
        "text": {
            "body": mensaje
        }
    }
    respuesta = requests.post(url, json=payload, headers=headers)
    if respuesta.status_code == 200:
        print("Mensaje enviado correctamente")
    else:
        print(f"Error enviando mensaje: {respuesta.text}")
