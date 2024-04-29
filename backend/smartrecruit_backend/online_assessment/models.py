from django.db import models

class Assessment(models.Model):
    name = models.CharField(max_length=100)
    topic = models.CharField(max_length=100)
    number_of_questions = models.IntegerField()
    time = models.IntegerField(help_text="Duration in minutes")
    required_score_to_pass = models.IntegerField(help_text="Required score in %")

    def __str__(self):
        return f'{self.name} - {self.topic}'
    
    def get_questions(self):
        return self.questions_set.all()[:self.number_of_questions]

