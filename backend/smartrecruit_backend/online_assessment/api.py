from django.http import JsonResponse, Http404   
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Assessment
from .serializers import AssessmentSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def assessment_details(request):
    assessments = Assessment.objects.all()
    serializer = AssessmentSerializer(assessments, many=True)
    return JsonResponse({'data': serializer.data})

