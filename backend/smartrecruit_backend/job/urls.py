from django.urls import path

from . import api

urlpatterns = [
    path('', api.job_list, name='api_job_list'),
]
