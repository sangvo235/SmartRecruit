from rest_framework import serializers
from .models import Invite
from useraccount.serializers import UserDetailsSerializer
from online_assessment.serializers import AssessmentSerializer
from results.models import Result

class InviteSerializer(serializers.ModelSerializer):
    user_email = serializers.SerializerMethodField()
    assessment = AssessmentSerializer()
    score = serializers.SerializerMethodField()

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
            'score'
        )

    def get_user_email(self, obj):
        return obj.user_id.email 
    
    def get_score(self, obj):
        try:
            result = Result.objects.get(invite=obj)
            return result.score
        except Result.DoesNotExist:
            return None
    