from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import SkillProcessor
from useraccount.models import User
from job.models import Job
from job_application.models import JobApplication

skill_processor = SkillProcessor()

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def apply_to_job(request):
    if request.method == 'POST':
        try:
            user_id = request.data.get('user_id')
            job_id = request.data.get('job_id')

            if not user_id or not job_id:
                return Response({"error": "Both user ID and job ID are required"}, status=400)

            try:
                user = User.objects.get(id=user_id)
                job = Job.objects.get(id=job_id)
            except (User.DoesNotExist, Job.DoesNotExist):
                return Response({"error": "User or job not found"}, status=404)

            if JobApplication.objects.filter(user=user, job=job).exists():
                return Response({"error": "User has already applied to this job"}, status=400)

            common_skills = set(job.skills).intersection(set(user.skills))
            score = len(common_skills) / len(job.skills) if job.skills else 0
            match_percentage = round(score * 100, 1)

            JobApplication.objects.create(
                user=user,
                job=job,
                match_percentage=match_percentage
            )

            return Response({"message": "Applied to job successfully"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
    return Response({'error': 'Method not allowed'}, status=405)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def match_resume(request):
    if request.method == 'POST':
        try:
            job_id = request.data.get('job_id')

            if not job_id:
                return Response({"error": "Job ID is required"}, status=400)

            job = Job.objects.get(id=job_id)

            job_applications = JobApplication.objects.filter(job=job)

            match_results = []
            for application in job_applications:
                match_results.append({
                    'user_id': application.user.id,
                    'user_email': application.user.email,
                    'username': application.user.name,
                    'match_percentage': application.match_percentage
                })

            return Response({"match_results": match_results})
        except Job.DoesNotExist:
            return Response({"error": "Job not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
    return Response({'error': 'Method not allowed'}, status=405)