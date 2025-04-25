from django.db import models


class Patient(models.Model):
    cpf = models.CharField(max_length=11, primary_key=True)
    name = models.CharField(max_length=150)
    birth_date = models.DateField()
    phone = models.CharField(max_length=20)
    email = models.EmailField(max_length=150, blank=True, null=True)

    def __str__(self):
        return f'{self.name} - {self.cpf}'
