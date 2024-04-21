from rest_framework import serializers

from .models import User

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'name',
            'avatar_url',
            'bio',
            'location',
            'phone',
        )