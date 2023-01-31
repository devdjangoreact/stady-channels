from django.urls import path
from .views import ExecuteCommandView, AutoCompleteView,Connect

urlpatterns = [
    path('execute-command/', ExecuteCommandView.as_view()),
    path('auto-complete/', AutoCompleteView.as_view()),
    path('connect/', Connect.as_view()),
]