from django.http import JsonResponse   
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Assessment
from .serializers import AssessmentSerializer, AssessmentResultSerializer
from questions.models import Answer, Question
from results.models import Result

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
#     if request.method == 'POST':
#         data = request.data
#         data_ = dict(data.lists())

#         user_id = data.get('user_id', None)
#         if user_id is None:
#             return JsonResponse({'error': 'User ID is required'}, status=400)
        
#         for k in data_.keys():
#             print('key: ', k)
#             question = Question.objects.get(text=k)
#             questions.append(question)
#         print(questions)
        
#         assessment = Assessment.objects.get(pk=pk)
        
#         score = 0
#         multiplier = 100 / assessment.number_of_questions
#         results = []
#         correct_answers = None

#         for q in questions: 
#             a_selected = data.get(q.text)

#             if a_selected != "":
#                 question_answers = Answer.objects.filter(question=q)
#                 for a in question_answers:
#                     if a_selected == a.text:
#                         if a.correct:
#                             score += 1
#                             correct_answers = a.text
#                     else:
#                         if a.correct: 
#                             correct_answers = a.text
#                 results.append({str(q): {'correct_answers': correct_answers, 'answered': a_selected}})
#             else:  
#                 results.append({str(q): 'not answer'})

#         score_ = score * multiplier
#         Result.objects.create(assessment=assessment, score=score_, user_id=user_id)

#         if score >= assessment.required_score_to_pass:
#             return JsonResponse({'passed': True, 'score': score_, 'results': results})
#         else:
#             return JsonResponse({'passed': False, 'score': score_, 'results': results})

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def save_asessement(request, pk):
    if request.method == 'POST':
        data = request.data

        user_id = data.get('user_id', None)
        if user_id is None:
            return JsonResponse({'error': 'User ID is required'}, status=400)

        questions = data.get('questions', [])
        answers = data.get('answers', [])

        if len(questions) != len(answers):
            return JsonResponse({'error': 'Questions and answers lengths do not match'}, status=400)

        assessment = Assessment.objects.get(pk=pk)

        score = 0
        multiplier = 100 / assessment.number_of_questions
        results = []

        for question_text, answer in zip(questions, answers):
            try:
                question = Question.objects.get(text=question_text)
                correct_answer_obj = Answer.objects.filter(question=question, correct=True).first()

                if correct_answer_obj:
                    correct_answer = correct_answer_obj.text
                    if answer == correct_answer:
                        score += 1
                        answered_correctly = True
                    else:
                        answered_correctly = False
                else:
                    correct_answer = "N/A"
                    answered_correctly = False

                results.append({
                    'question': question_text,
                    'answered': answer,
                    'correct_answer': correct_answer,
                    'answered_correctly': answered_correctly
                })
            except Question.DoesNotExist:
                results.append({
                    'question': question_text,
                    'answered': answer,
                    'correct_answer': "Question not found",
                    'answered_correctly': False
                })

        score_ = score * multiplier
        Result.objects.create(assessment=assessment, score=score_, user_id=user_id)

        passed = score_ >= assessment.required_score_to_pass

        return JsonResponse({
            'passed': passed,
            'score': score_,
            'results': results
        })
