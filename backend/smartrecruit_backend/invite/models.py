from django.db import models
from online_assessment.models import Assessment
from useraccount.models import User

class Invite(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, related_name='invites', on_delete=models.CASCADE)
    assessment = models.ForeignKey(Assessment, related_name='invites', on_delete=models.CASCADE, default=None, blank=True, null=True)
    invite_date = models.DateTimeField(auto_now_add=True)
    expire_date = models.DateTimeField()

    def __str__(self):
        return f"{self.user_id.name} ({self.user_id.email}): {self.assessment.name} - {self.assessment.topic}"
    