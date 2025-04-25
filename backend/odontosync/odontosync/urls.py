from django.contrib import admin
from django.urls import path

from dentist.views import DentistList, DentistDetail
from patient.views import PatientList, PatientDetail
from schedule.views import ScheduleList, ScheduleDetail


urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/v1/dentist/', DentistList.as_view()),
    path('api/v1/dentist/<str:crm>/', DentistDetail.as_view()),

    path('api/v1/patient/', PatientList.as_view()),
    path('api/v1/patient/<str:pk>/', PatientDetail.as_view()),

    path('api/v1/schedule/', ScheduleList.as_view()),
    path('api/v1/schedule/<int:pk>/', ScheduleDetail.as_view()),
]
