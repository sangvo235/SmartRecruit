from rest_framework import serializers
from .models import Job
from useraccount.serializers import UserDetailsSerializer
from job_application.models import JobApplication
from useraccount.models import User

class JobListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = (
            'id',
            'title',
            'contract_type',
            'company',
            'industry',
            'location',
            'intro',
            'description',
            'salary',
            'recruiter',
            'image_url',
            'created_at',
        )

class JobDetailSerializer(serializers.ModelSerializer):
    recruiter_name = serializers.SerializerMethodField()
    recruiter_email = serializers.SerializerMethodField()    
    class Meta:
        model = Job
        fields = (
            'id',
            'title',
            'contract_type',
            'company',
            'industry',
            'location',
            'intro',
            'description',
            'salary',
            'recruiter',
            'recruiter_name',
            'recruiter_email',            
            'image_url',
            'created_at',
        )

    def get_recruiter_name(self, obj):
        return obj.recruiter.name

    def get_recruiter_email(self, obj):
        return obj.recruiter.email 
    
class JobApplicationRankSerializer(serializers.ModelSerializer):
    user_id = serializers.SerializerMethodField()
    user_name = serializers.SerializerMethodField()
    user_email = serializers.SerializerMethodField()
    match_percentage = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = (
            'id',
            'title',
            'company',
            'user_id',
            'user_name',
            'user_email',
            'match_percentage',
        )

    def get_user_id(self, obj):
        try:
            job_application = JobApplication.objects.get(job=obj)
            return job_application.user.id
        except JobApplication.DoesNotExist:
            return None

    def get_user_name(self, obj):
        try:
            job_application = JobApplication.objects.get(job=obj)
            return job_application.user.name
        except JobApplication.DoesNotExist:
            return None

    def get_user_email(self, obj):
        try:
            job_application = JobApplication.objects.get(job=obj)
            return job_application.user.email
        except JobApplication.DoesNotExist:
            return None

    def get_match_percentage(self, obj):
        try:
            job_application = JobApplication.objects.get(job=obj)
            return job_application.match_percentage
        except JobApplication.DoesNotExist:
            return None