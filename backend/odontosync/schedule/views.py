from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Schedule
from .serializer import ScheduleSerializer


class ScheduleList(ListCreateAPIView):
    serializer_class = ScheduleSerializer
    queryset = Schedule.objects.all()


class ScheduleDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = ScheduleSerializer
    queryset = Schedule.objects.all()