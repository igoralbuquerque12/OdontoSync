from django.db import models


class Schedule(models.Model):
    date = models.DateTimeField()
    service_type = models.IntegerField()
    dentist = models.ForeignKey()
    patient = models.ForeignKey()

    def __init__(self):
        return f'Schedule - {self.patient} at {self.date}'