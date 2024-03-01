from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('display', views.display),
    path('createaccount', views.createAccount)
]