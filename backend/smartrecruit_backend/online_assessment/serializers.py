from rest_framework import serializers
from .models import Assessment
from job.serializers import JobListSerializer
from django.conf import settings

class AssessmentSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title')
    job_company = serializers.CharField(source='job.company')
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
            'image_url',
        )

    def get_job_title(self, obj):
        return obj.job.title
    
    def get_job_company(self, obj):
        return obj.job.company
    
    def get_image_url(self, obj):
        return obj.job.image_url()
