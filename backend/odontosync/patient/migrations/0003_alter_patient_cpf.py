# Generated by Django 5.1.7 on 2025-04-25 02:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patient', '0002_alter_patient_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='cpf',
            field=models.CharField(max_length=11, primary_key=True, serialize=False),
        ),
    ]
