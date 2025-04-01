from django.db import models


class Dentist(models.Model):
    crm = models.CharField(max_length=20, primary_key=True) 
    name = models.CharField(max_length=255)  
    specialty = models.CharField(max_length=255)  
    status = models.BooleanField(default=True)  

    def __str__(self):
        return self.name