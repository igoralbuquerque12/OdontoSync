from rest_framework import serializers

from .models import Dentist


class DentistSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Dentist
        fields = '__all__'