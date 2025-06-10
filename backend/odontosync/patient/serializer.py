from rest_framework import serializers

from .models import Patient


class PatientSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Patient
        fields = '__all__'

class ResumePatientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = ['name', 'cpf', 'phone']