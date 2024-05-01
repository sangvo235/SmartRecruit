from django.urls import path
from . import api

urlpatterns = [
    path('<str:pk>/', api.assessment_details, name='api_assessment'),
    path('data/<str:pk>', api.asessement_question_answer_data, name='api_asessement_question_answer_data'),
]
