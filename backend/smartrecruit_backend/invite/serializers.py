from rest_framework import serializers
from .models import Invite
from useraccount.serializers import UserDetailsSerializer
from online_assessment.serializers import AssessmentSerializer

class InviteSerializer(serializers.ModelSerializer):
    user_email = UserDetailsSerializer()
    assessment_id = AssessmentSerializer()

    class Meta:
        model = Invite
        fields = (
            'user_id',
            'assessment_id',
            'invite_date',
            'expire_date',
            'expired',
            'completed',
        )

    def get_user_email(self, obj):
        return obj.user_id.email 