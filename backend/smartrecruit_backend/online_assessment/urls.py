from django.urls import path
from . import api

urlpatterns = [
    path('<pk>/', api.assessment_details, name='api_assessment'),
    path('save/<pk>', api.save_asessement, name='api_save_asessement'),
    path('data/<pk>', api.asessement_question_answer_data, name='api_asessement_question_answer_data'),
]
