from django.db import models
from online_assessment.models import Assessment
from useraccount.models import User

class Invite(models.Model):
    user_id = models.ForeignKey(User, related_name='invites', on_delete=models.CASCADE)
    assessment = models.ForeignKey(Assessment, related_name='invites', on_delete=models.CASCADE)
    invite_date = models.DateTimeField(auto_now_add=True)
    expire_date = models.DateTimeField()
    expired = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user_id} - {self.assessment}'

