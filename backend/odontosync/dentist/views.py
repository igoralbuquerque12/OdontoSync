from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Dentist
from .serializer import DentistSerializer


class DentistList(ListCreateAPIView):
    serializer_class = DentistSerializer
    queryset = Dentist.objects.all()


class DentistDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = DentistSerializer
    queryset = Dentist.objects.all()