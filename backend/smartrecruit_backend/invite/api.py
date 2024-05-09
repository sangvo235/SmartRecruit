from django.http import JsonResponse   
from django.utils import timezone
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Invite
from .serializers import InviteSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_active_invites(request, user_id):
    active_invites = Invite.objects.filter(
        user_id=user_id, 
        result__isnull=True,
        expire_date__gt=timezone.now() 
    )
    serializer = InviteSerializer(active_invites, many=True)
    return JsonResponse({'data': serializer.data})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_expired_invites(request, user_id):
    expired_invites = Invite.objects.filter(
        user_id=user_id, 
        expire_date__lte=timezone.now(),
        result__isnull=True
    )
    serializer = InviteSerializer(expired_invites, many=True)
    return JsonResponse({'data': serializer.data})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_completed_invites(request, user_id):
    completed_invites = Invite.objects.filter(
        user_id=user_id, 
        result__isnull=False 
    )
    serializer = InviteSerializer(completed_invites, many=True)
    return JsonResponse({'data': serializer.data})
