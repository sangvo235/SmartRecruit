from django.http import JsonResponse, Http404   
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Assessment
from .serializers import AssessmentListSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def assessment_list(request):
    assessments = Assessment.objects.all()
    serializer = AssessmentListSerializer(assessments, many=True)
    return JsonResponse({'data': serializer.data})

