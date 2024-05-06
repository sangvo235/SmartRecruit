from django.db import models
from job.models import Job

class Assessment(models.Model):
    name = models.CharField(max_length=100)
    topic = models.CharField(max_length=100)
    number_of_questions = models.IntegerField()
    time = models.IntegerField(help_text="Duration in minutes")
    required_score_to_pass = models.IntegerField(help_text="Required score in %")
    job = models.ForeignKey(Job, related_name='assessments', on_delete=models.CASCADE, default=None, blank=True, null=True)

    def __str__(self):
        return f'{self.name} - {self.topic}'