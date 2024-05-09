from django.db import models
from invite.models import Invite
from useraccount.models import User

class Result(models.Model):
    invite = models.OneToOneField(Invite, on_delete=models.CASCADE, default=None, blank=True, null=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.FloatField()

    def __str__(self):
        return str(self.pk)