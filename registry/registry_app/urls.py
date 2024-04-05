from django.urls import path
from . import views

app_name = 'registry_app'

urlpatterns = [
    path('wishlist/', views.wishlist_view, name='wishlist'),
    path('create_wishlist/', views.create_wishlist, name='create_wishlist'),
    path('delete_wishlist/<int:wishlist_id>/', views.delete_wishlist, name='delete_wishlist'),
    path('load_wishlists/', views.load_wishlists, name='load_wishlists'),
]