from django.db import models


class Patient(models.Model):
    cpf = models.CharField(max_length=6, primary_key=True)
    name = models.CharField(max_length=150)
    birth_date = models.DateField()
    phone = models.CharField(max_length=20)
    email = models.CharField(blank=True, null=True)

    def __init__(self):
        return f'{self.name} - {self.cpf}'
