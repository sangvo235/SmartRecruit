from django.http import JsonResponse   
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Job
from .serializers import JobListSerializer, JobApplicationRankSerializer, JobDetailSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def job_list(request):
    jobs = Job.objects.all()
    serializer = JobListSerializer(jobs, many=True)
    return JsonResponse({'data': serializer.data})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def job_detail(request, job_id):
    job = Job.objects.get(id=job_id)
    serializer = JobDetailSerializer(job)
    return JsonResponse(serializer.data)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def job_application_rank(request):
    jobs = Job.objects.all()
    serializer = JobApplicationRankSerializer(jobs, many=True)
    return JsonResponse({'data': serializer.data})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def job_application_detail(request, job_id):
    job = Job.objects.get(id=job_id)
    serializer = JobApplicationRankSerializer(job)
    return JsonResponse({'data': serializer.data})
