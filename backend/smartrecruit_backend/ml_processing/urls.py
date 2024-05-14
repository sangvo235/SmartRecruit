from django.urls import path
from . import api

urlpatterns = [
    path('match/', api.match_resume, name='match_resume'),
]
