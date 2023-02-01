import os

from django.core.asgi import get_asgi_application
from django.urls import path, re_path

from channels.routing import ProtocolTypeRouter, URLRouter

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

from .middleware import TokenAuthMiddlewareStack

import terminal_emulator.routing
import trips.routing

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': TokenAuthMiddlewareStack(
        URLRouter(
            trips.routing.websocket_urlpatterns +
            terminal_emulator.routing.websocket_urlpatterns
                  )
    ),
})
