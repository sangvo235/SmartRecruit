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

# @api_view(['PUT']) 
# # @authentication_classes([])
# # @permission_classes([])
# def user_update(request, pk):
#     try:
#         user = User.objects.get(pk=pk)
#     except User.DoesNotExist:
#         return JsonResponse({"error": "User not found"}, status=404)

#     if request.method == 'PUT': 
#         serializer = UserDetailsSerializer(instance=user, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=200) 
#         return JsonResponse(serializer.errors, status=400) 

@api_view(['POST'])
def user_update(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

    if request.method == 'POST': 
        serializer = UserDetailsSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200) 
        return JsonResponse(serializer.errors, status=400)