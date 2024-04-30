from django.http import JsonResponse, Http404   
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Invite
from .serializers import InviteSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def invite_details(request, user_id):
    invites = Invite.objects.filter(user_id=user_id)
    serializer = InviteSerializer(invites, many=True)
    return JsonResponse({'data': serializer.data})

