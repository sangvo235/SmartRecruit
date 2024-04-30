from django.urls import path
from . import api

urlpatterns = [
    path('user/<uuid:user_id>/', api.invite, name='api_invite'),
]
