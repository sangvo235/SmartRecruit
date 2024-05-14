from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import JobDescription, ResumeProcessor
from useraccount.models import User

resume_processor = ResumeProcessor()

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def match_resume(request):
    if request.method == 'POST':
        try:
            job_description_id = request.data.get("job_description_id", None)
            resume_text = request.data.get("resume_text", "")

            if not job_description_id or not resume_text:
                return Response({"error": "Both job description ID and resume text are required"}, status=400)

            job_desc = JobDescription.objects.get(id=job_description_id)

            # Extract skills from the resume
            cleaned_resume_text = resume_processor.clean_text(resume_text)
            resume_skills = resume_processor.extract_skills(cleaned_resume_text)

            # Compute the match score
            common_skills = set(job_desc.skills).intersection(set(resume_skills))
            score = len(common_skills) / len(job_desc.skills) if job_desc.skills else 0
            match_percentage = round(score * 100, 1)

            return Response({
                "job_description_skills": job_desc.skills,
                "resume_skills": resume_skills,
                "match_percentage": match_percentage,
            })

        except JobDescription.DoesNotExist:
            return Response({"error": f"Job description with ID {job_description_id} not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
    return Response({'error': 'Method not allowed'}, status=405)
