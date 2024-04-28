from django.urls import path
from . import api

urlpatterns = [
    path('', api.assessment_list, name='api_assessment_list'),
    path('<uuid:assessment_id>/', api.assessment, name='api_assessment'),
]
