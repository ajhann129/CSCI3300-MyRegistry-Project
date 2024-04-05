from django.urls import path
from . import views

app_name = 'view_registry_app'

urlpatterns = [
path('<int:wishlist_id>/', views.dashboard, name='dashboard_with_wishlist_id'),
path('create_item/', views.create_item, name='create_item'),
]