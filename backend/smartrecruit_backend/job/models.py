import uuid 
from django.conf import settings
from django.db import models
from useraccount.models import User
from ml_processing.models import SkillProcessor

skill_processor = SkillProcessor()

class Job(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    contract_type = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    industry = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    salary = models.IntegerField()
    intro = models.CharField(max_length=255)
    description = models.TextField()
    recruiter = models.ForeignKey(User, related_name='jobs', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='uploads/jobs')
    skills = models.JSONField(blank=True, null=True)

    def image_url(self):
        return f'{settings.WEBSITE_URL}{self.image.url}'
    
    def save(self, *args, **kwargs):
        if self.description:
            cleaned_text = skill_processor.clean_text(self.description)
            extract_skills = skill_processor.extract_skills(cleaned_text)
            self.skills = list(set(extract_skills))

        super(Job, self).save(*args, **kwargs)