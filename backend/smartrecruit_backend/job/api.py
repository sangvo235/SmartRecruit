from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Job
from .serializers import JobListSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def job_list(request):
    jobs = Job.objects.all()
    serializer = JobListSerializer(jobs, many=True)

    return JsonResponse({
        'data': serializer.data,
    })
