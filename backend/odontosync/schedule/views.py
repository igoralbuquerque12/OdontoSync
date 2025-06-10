from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django_filters import rest_framework as filters

from .models import Schedule
from .serializer import ScheduleSerializer, ListScheduleSerializer


class ScheduleList(ListCreateAPIView):
    serializer_class = ListScheduleSerializer
    queryset = Schedule.objects.all()
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = {
        'date': ['exact']
    }

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ListScheduleSerializer
        return ScheduleSerializer


class ScheduleDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = ScheduleSerializer
    queryset = Schedule.objects.all()