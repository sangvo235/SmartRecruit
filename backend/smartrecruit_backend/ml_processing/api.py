from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import SkillProcessor
from useraccount.models import User
from job.models import Job

skill_processor = SkillProcessor()

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def match_resume(request):
    if request.method == 'POST':
        try:
            user_id = request.data.get('user_id')
            job_id = request.data.get('job_id')

            if not user_id or not job_id:
                return Response({"error": "Both user ID and job ID are required"}, status=400)

            user = User.objects.get(id=user_id)
            job = Job.objects.get(id=job_id)

            if not user.skills or not job.skills:
                return Response({"error": "User and job must have skills"}, status=400)

            common_skills = set(job.skills).intersection(set(user.skills))
            score = len(common_skills) / len(job.skills) if job.skills else 0
            match_percentage = round(score * 100, 1)

            return Response({
                "user_skills": user.skills,
                "job_skills": job.skills,
                "match_percentage": match_percentage,
            })
        except (User.DoesNotExist, Job.DoesNotExist):
            return Response({"error": "User or job not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
    return Response({'error': 'Method not allowed'}, status=405)
