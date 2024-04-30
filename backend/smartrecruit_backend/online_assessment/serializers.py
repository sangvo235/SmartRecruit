from rest_framework import serializers
from .models import Assessment

class AssessmentSerializer(serializers.ModelSerializer):
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
        )
