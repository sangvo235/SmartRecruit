from django.urls import path
from . import api

urlpatterns = [
    path('apply/', api.apply_to_job, name='apply_to_job'),
    path('match/', api.match_resume, name='match_resume'),
]
