from django.urls import re_path 
from . import consumers
from trips.consumers import TaxiConsumer
websocket_urlpatterns = [
    re_path('taxi/', TaxiConsumer.as_asgi()),
]