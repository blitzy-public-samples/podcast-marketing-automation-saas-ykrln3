import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'podcast_marketing.settings')

application = get_asgi_application()