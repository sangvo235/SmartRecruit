from django.urls import path
from . import api

urlpatterns = [
    path('', api.assessment_list, name='api_assessment_list'),
    path('<pk>/', api.assessment_details, name='api_assessment_details'),
    path('save/<pk>', api.save_asessement, name='api_save_asessement'),
    path('data/<pk>', api.asessement_question_answer_data, name='api_asessement_question_answer_data'),
]
