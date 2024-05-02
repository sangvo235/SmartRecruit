from django.urls import path
from . import views

urlpatterns = [
    path('process/', views.process_resume, name='process_resume'),
    path('job_description/', views.parse_job_description, name='parse_job_description'),
    path('match/', views.match_resume, name='match_resume'),
]
