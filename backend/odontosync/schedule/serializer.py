from rest_framework import serializers

from .models import Schedule


class ScheduleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Schedule
        fields = '__all__' 

    def create(self, validated_data):
        print(validated_data)
        return super().create(validated_data)