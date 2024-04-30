from django.http import JsonResponse, Http404   
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Invite
from .serializers import InviteSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_active_invites(request, user_id):
    queryset = Invite.objects.filter(user_id=user_id, expired=False, completed=False)
    serializer = InviteSerializer(queryset, many=True)
    return JsonResponse({'data': serializer.data})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_expired_invites(request, user_id):
    queryset = Invite.objects.filter(user_id=user_id, expired=True)
    serializer = InviteSerializer(queryset, many=True)
    return JsonResponse({'data': serializer.data})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_completed_invites(request, user_id):
    queryset = Invite.objects.filter(user_id=user_id, completed=True)
    serializer = InviteSerializer(queryset, many=True)
    return JsonResponse({'data': serializer.data})

