from rest_framework import serializers

from .models import Schedule
from patient.serializer import ResumePatientSerializer

class ListScheduleSerializer(serializers.ModelSerializer):
    patient = ResumePatientSerializer()

    class Meta:
        model = Schedule
        fields = '__all__' 

    def create(self, validated_data):
        return super().create(validated_data)
    

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__' 

    def create(self, validated_data):
        return super().create(validated_data)