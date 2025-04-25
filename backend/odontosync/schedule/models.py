from django.db import models

from patient.models import Patient
from dentist.models import Dentist

class Schedule(models.Model):
    date = models.DateTimeField()
    service_type = models.IntegerField()
    value = models.FloatField()
    dentist = models.ForeignKey(Dentist, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    

    def __init__(self):
        return f'Schedule - {self.patient} at {self.date}'