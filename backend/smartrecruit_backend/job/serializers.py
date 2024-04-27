from rest_framework import serializers
from .models import Job
from useraccount.serializers import UserDetailsSerializer

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