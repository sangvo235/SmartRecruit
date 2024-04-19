from rest_framework import serializers
from .models import Job

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
            'image',
            'created_at',
        )

class JobDetailSerializer(serializers.ModelSerializer):
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
            'image',
            'created_at',
        )