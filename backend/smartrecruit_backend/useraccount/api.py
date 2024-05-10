from django.http import JsonResponse   
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import User
from .serializers import UserDetailsSerializer, UserResumeSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def user_details(request, pk):
    user = User.objects.get(pk=pk)
    serializer = UserDetailsSerializer(user)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def user_resume(request, pk):
    user = User.objects.get(pk=pk)
    serializer = UserResumeSerializer(user)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
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
    
    if request.method == 'POST' and request.FILES.get('avatar'):
        avatar_file = request.FILES['avatar']
        user.avatar = avatar_file
        user.save()
        return JsonResponse({"avatar_url": user.avatar.url}, status=200)
    else:
        return JsonResponse({"error": "Invalid request"}, status=400)
    

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def upload_avatar(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

    if request.method == 'POST' and request.FILES.get('avatar'):
        avatar_file = request.FILES['avatar']
        user.avatar = avatar_file
        user.save()
        return JsonResponse({"avatar_url": user.avatar.url}, status=200)
    else:
        return JsonResponse({"error": "Invalid request"}, status=400)
    
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def upload_resume(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

    if request.method == 'POST' and request.FILES.get('resume'):
        resume_file = request.FILES['resume']
        user.resume = resume_file
        user.save()
        return JsonResponse({"resume_url": user.resume.url}, status=200)
    else:
        return JsonResponse({"error": "Invalid request"}, status=400)