"""
WSGI config for core project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os
import socketio
import eventlet
import eventlet.wsgi
from term.views import sio

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = get_wsgi_application()

django_app = socketio.Middleware(sio, application)

eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 8000)), django_app)

