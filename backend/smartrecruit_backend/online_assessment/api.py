from django.http import JsonResponse   
# from backend.smartrecruit_backend.questions.models import Answer
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

# @api_view(['POST'])
# @authentication_classes([])
# @permission_classes([])
# def save_asessement(request, pk):
#     print(request.POST)
#     user = request.user
#     assessment = Assessment.objects.get(pk=pk)

#     score = 0
#     multiplier = 100 / assessment.number_of_questions
#     results = []
#     correct_answer = None
    
#     for q in questions:
#         a_selected = request.POST.get(q.text)

#         if a_selected != "":
#             question_answers = Answer.objects.filter(question=q)
#             for a in question_answers:
#                 if a_selected == a.text:
#                     if a.correct:
#                         score += 1
#                         correct_answer = a.text
#                     else:
#                         if a.correct: 
#                             correct_answer = a.text
#             results.append({str(q): {'correct_answer': correct_answer, 'answer': a_selected}})
#         else:
#             results.append({str(q): 'not answered'})

#     return JsonResponse({'text': 'success'})


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def save_asessement(request, pk):
    print(request.POST)
    if request.POST:
        print(request.POST)
    return JsonResponse({'text': 'success'})
