from django.db import models
from online_assessment.models import Assessment

# Create your models here.

class Question(models.Model):
    text = models.CharField(max_length=200)
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.text)
    
    def get_answers(self):
        return self.answer.all()

class Answer(models.Model):
    text = models.CharField(max_length=200)
    correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"question: {self.question.text} - answer: {self.text}, correct: {self.correct}"
