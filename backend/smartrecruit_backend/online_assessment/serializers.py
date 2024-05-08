from rest_framework import serializers
from .models import Assessment
from job.serializers import JobListSerializer
from django.conf import settings

class AssessmentSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title')
    job_company = serializers.CharField(source='job.company')
    job_location = serializers.CharField(source='job.location')
    image_url = serializers.SerializerMethodField(source='job.image_url')   

    class Meta:
        model = Assessment
        fields = (
            'id',
            'name',
            'topic',
            'number_of_questions',
            'time',
            'required_score_to_pass',
            'job',
            'job_title',
            'job_company',
            'job_location',
            'image_url',
        )

    def get_job_title(self, obj):
        return obj.job.title
    
    def get_job_company(self, obj):
        return obj.job.company
    
    def get_job_location(self, obj):
        return obj.job.location
    
    def get_image_url(self, obj):
        return obj.job.image_url()
    
class AssessmentAnswerSerializer(serializers.Serializer):
    question_text = serializers.CharField()
    answered = serializers.CharField()

class AssessmentResultSerializer(serializers.Serializer):
    passed = serializers.BooleanField()
    score = serializers.IntegerField()
    results = AssessmentAnswerSerializer(many=True)