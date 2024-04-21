from django.http import JsonResponse, Http404   
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import User
from .serializers import UserDetailsSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def user_details(request, pk):
    user = User.objects.get(pk=pk)
    serializer = UserDetailsSerializer(user)
    return JsonResponse(serializer.data, safe=False)
