import uuid 

from django.conf import settings
from django.db import models

from useraccount.models import User

class Job(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    salary = models.ImageField()
    location = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    recruiter = models.ForeignKey(User, related_name='jobs', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
