from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Patient
from .serializer import PatientSerializer


class PatientList(ListCreateAPIView):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()


class PatientDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()