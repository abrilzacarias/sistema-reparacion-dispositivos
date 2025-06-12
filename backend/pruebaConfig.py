import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.config import settings

print("ACCESS TOKEN:", settings.whatsapp_access_token)
print("PHONE ID:", settings.whatsapp_phone_number_id)
