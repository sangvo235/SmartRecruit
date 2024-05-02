from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/jobs/', include('job.urls')),
    path('api/auth/', include('useraccount.urls')),
    path('api/user_details/', include('useraccount.urls')),
    path('api/', include('ml_processing.urls')),  # Your local change
    path('api/user_update/', include('useraccount.urls')),  # Remote change
    path('api/upload_avatar/', include('useraccount.urls')),  # Remote change
    path('api/online_assessments/', include('online_assessment.urls')),  # Remote change
    path('api/invite/', include('invite.urls')),  # Remote change
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
