from django.urls import path
from . import api

urlpatterns = [
    path('<str:pk>/', api.assessment_details, name='api_assessment'),
]
