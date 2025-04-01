from django.contrib import admin
from django.urls import path

from dentist.views import DentistList, DentistDetail
from patient.views import PatientList, PatientDetail
from schedule.views import ScheduleList, ScheduleDetail


urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('dentist/', DentistList.as_view()),
    path('dentist/<str:crm>/', DentistDetail.as_view()),

    path('patient/', PatientList.as_view()),
    path('patient/<str:cpf>/', PatientDetail.as_view()),

    path('schedule/', ScheduleList.as_view()),
    path('schedule/<int:pk>/', ScheduleDetail.as_view()),
]
