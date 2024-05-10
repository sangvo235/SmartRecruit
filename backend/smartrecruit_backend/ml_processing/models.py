# models.py
from django.db import models

class JobDescription(models.Model):
    text = models.TextField()  # Original job description text
    skills = models.JSONField()  # List of extracted skills

    def __str__(self):
        return self.text[:50]  # For a quick view of the description

