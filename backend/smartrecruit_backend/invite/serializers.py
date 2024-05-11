from rest_framework import serializers
from .models import Invite
from online_assessment.serializers import AssessmentSerializer
from results.models import Result

class InviteSerializer(serializers.ModelSerializer):
    assessment = AssessmentSerializer()
    user_email = serializers.SerializerMethodField(source='user_id.email')
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
            'score'
        )
    
    def get_score(self, obj):
        try:
            result = Result.objects.get(invite=obj)
            return result.score
        except Result.DoesNotExist:
            return None
    
class AssessmentScoreListSerializer(serializers.ModelSerializer):
    assessment_id = serializers.IntegerField(source='assessment.id')
    user_name = serializers.CharField(source='user_id.name')
    user_email = serializers.CharField(source='user_id.email')
    score = serializers.SerializerMethodField()

    class Meta:
        model = Invite
        fields = (
            'assessment_id',
            'user_id',
            'user_email',
            'user_name',
            'score'
        )

    def get_score(self, obj):
        try:
            result = Result.objects.get(invite=obj)
            return result.score
        except Result.DoesNotExist:
            return None
    