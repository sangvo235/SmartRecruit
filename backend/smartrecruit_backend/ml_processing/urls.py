from django.urls import path
from . import views
from . import api

urlpatterns = [
    path('process/', api.process_resume, name='process_resume'),
    path('job_description/', api.parse_job_description, name='parse_job_description'),
    path('match/', api.match_resume, name='match_resume'),
]
