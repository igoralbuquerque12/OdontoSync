from django.db import models

from patient.models import Patient
from dentist.models import Dentist

class Schedule(models.Model):
    date = models.DateField()
    time = models.TimeField()
    service_type = models.IntegerField()
    value = models.DecimalField(max_digits=10, decimal_places=2)
    dentist = models.ForeignKey(Dentist, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    

    def __str__(self):
        return f'Schedule - {self.patient} at {self.date}'