from rest_framework import serializers
from .models import Invite
from useraccount.serializers import UserDetailsSerializer
from online_assessment.serializers import AssessmentSerializer

class InviteSerializer(serializers.ModelSerializer):
    user_email = serializers.SerializerMethodField()
    assessment = AssessmentSerializer()

    class Meta:
        model = Invite
        fields = (
            'id',
            'user_id',
            'user_email',
            'assessment',
            'invite_date',
            'expire_date',
            'expired',
            'completed',
        )

    def get_user_email(self, obj):
        return obj.user_id.email 