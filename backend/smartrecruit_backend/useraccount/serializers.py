from rest_framework import serializers
from .models import User

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'name',
            'bio',
            'location',
            'phone',
            'avatar_url',
        )

class UserResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'resume_url',
        )
