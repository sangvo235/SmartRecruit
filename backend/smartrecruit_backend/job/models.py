from django.conf import settings
from django.db import models
from useraccount.models import User

class Job(models.Model):
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
    image = models.ImageField(upload_to='uploads/jobs', default='uploads/jobs/default.jpg')

    def image_url(self):
        if self.image:
            return f'{settings.WEBSITE_URL}{self.image.url}'
        else: 
            return ''