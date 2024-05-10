import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .ml_model import ResumeProcessor
from .models import JobDescription

resume_processor = ResumeProcessor()

@csrf_exempt
def process_resume(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            resume_text = data.get('resume_text', '')
            skills = resume_processor.analyze_resume(resume_text)
            return JsonResponse({'skills': skills}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def parse_job_description(request):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body.decode('utf-8'))
            job_description_text = data.get('job_description', '')

            if not job_description_text:
                return JsonResponse({"error": "Job description text is required"}, status=400)

            # Clean and extract skills
            cleaned_text = resume_processor.clean_text(job_description_text)
            job_description_skills = resume_processor.extract_skills(cleaned_text)

            # Store it in the database
            job_desc = JobDescription.objects.create(text=job_description_text, skills=job_description_skills)
            
            return JsonResponse({"id": job_desc.id, "skills": job_description_skills})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def match_resume(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            job_description_id = data.get("job_description_id", None)
            resume_text = data.get("resume_text", "")

            if not job_description_id or not resume_text:
                return JsonResponse({"error": "Both job description ID and resume text are required"}, status=400)

            job_desc = JobDescription.objects.get(id=job_description_id)

            # Extract skills from the resume
            cleaned_resume_text = resume_processor.clean_text(resume_text)
            resume_skills = resume_processor.extract_skills(cleaned_resume_text)

            # Compute the match score
            common_skills = set(job_desc.skills).intersection(set(resume_skills))
            score = len(common_skills) / len(job_desc.skills) if job_desc.skills else 0
            match_percentage = round(score * 100, 1)

            return JsonResponse({
                "job_description_skills": job_desc.skills,
                "resume_skills": resume_skills,
                "match_percentage": match_percentage,
            })

        except JobDescription.DoesNotExist:
            return JsonResponse({"error": f"Job description with ID {job_description_id} not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)
