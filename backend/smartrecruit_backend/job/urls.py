from django.urls import path
from . import api

urlpatterns = [
    path('', api.job_list, name='api_job_list'),
    path('<uuid:job_id>/', api.job_detail, name='api_job_detail'),
]
