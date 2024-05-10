from django.urls import path
from . import api

urlpatterns = [
    path('details/<assessment>/', api.get_assessment_invites, name='api_invite_details'),
    path('active/user/<uuid:user_id>/', api.get_active_invites, name='api_active_invites'),
    path('expired/user/<uuid:user_id>/', api.get_expired_invites, name='api_expired_invites'),
    path('completed/user/<uuid:user_id>/', api.get_completed_invites, name='api_completed_invites'),
]
