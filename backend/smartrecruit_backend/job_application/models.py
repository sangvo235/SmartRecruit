from django.db import models
from useraccount.models import User
from job.models import Job

class JobApplication(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    match_percentage = models.FloatField(null=True)


