from django.urls import path
from . import api

urlpatterns = [
    path('', api.assessment_details, name='api_assessment_details'),
    # path('<uuid:pk>/', api.assessment, name='api_assessment'),
]
