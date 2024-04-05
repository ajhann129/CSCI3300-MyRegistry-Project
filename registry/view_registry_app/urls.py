from django.urls import path
from . import views

app_name = 'view_registry_app'

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('create_item/', views.create_item, name='create_item'),
]