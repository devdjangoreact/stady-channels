from django.urls import path
from .views import screenshot, CoordinateView

urlpatterns = [
    path('screenshot/', screenshot, name='screenshot'),
    path('coordinates/', CoordinateView.as_view()),
]