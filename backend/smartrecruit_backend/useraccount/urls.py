from django.urls import path
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from rest_framework_simplejwt.views import TokenVerifyView

from . import api

urlpatterns = [
    path('register/', RegisterView.as_view(), name='rest_register'),
    path('login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
    path('<uuid:pk>/', api.user_details, name='api_user_details'),
    path('<uuid:pk>/admin/', api.user_admin, name='api_user_admin'),
    path('<uuid:pk>/resume/', api.user_resume, name='api_user_resume'),
    path('<uuid:pk>/update/', api.user_update, name='api_user_update'),
    path('<uuid:pk>/upload/avatar/', api.upload_avatar, name='api_upload_avatar'),
    path('<uuid:pk>/upload/resume/', api.upload_resume, name='api_upload_resume'),
]