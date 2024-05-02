from django.http import JsonResponse   
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Assessment
from .serializers import AssessmentSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def assessment_details(request, pk):
    assessments = Assessment.objects.get(pk=pk)
    serializer = AssessmentSerializer(assessments)
    return JsonResponse({'data': serializer.data})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def asessement_question_answer_data(request, pk):
    assessments = Assessment.objects.get(pk=pk)
    questions = []
    for question in assessments.get_questions():
        answers = []
        for answer in question.get_answers():
            answers.append(answer.text)
        questions.append({str(question.text): answers})
    return JsonResponse({
        'data': questions,
        'time': assessments.time,
        'name' : assessments.name,
    })

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def save_asessement(request, pk):
    print(request.POST)
    if request.POST:
        print(request.POST)
    return JsonResponse({'text': 'success'})
