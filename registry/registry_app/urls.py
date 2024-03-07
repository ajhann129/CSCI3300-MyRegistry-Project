from django.urls import path
from .views import dashboard
from . import views

urlpatterns = [
    path('', dashboard, name='dashboard'),
    path('wishlist/', views.wishlist_view, name='wishlist'),
]