from django.http import JsonResponse, Http404   
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Invite
from .serializers import InviteSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def invite(request, user_id):
    try:
        invite = Invite.objects.get(id=user_id)
    except Invite.DoesNotExist:
        raise Http404("Invite does not exist")

    serializer = InviteSerializer(invite)
    return JsonResponse(serializer.data)