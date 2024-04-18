from django.urls import path
from . import views

app_name = 'registry_app'

urlpatterns = [
    path('', views.wishlist_view, name='wishlist'),
    path('create_wishlist/', views.create_wishlist, name='create_wishlist'),
    path('delete_wishlist/<int:wishlist_id>/', views.delete_wishlist, name='delete_wishlist'),
    path('load_wishlists/', views.load_wishlists, name='load_wishlists'),
    path('load_other_wishlist/', views.load_other_wishlist, name='load_other_wishlist'),
    path('sign_out/', views.sign_out, name='sign_out'),
]