from django.urls import path
from . import views

app_name = 'view_registry_app'

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('create_item/<int:wishlist_id>/', views.create_item, name='create_item'),
    path('delete_item/<int:item_id>/', views.delete_item, name='delete_item'),
    path('buy_item/<int:item_id>/', views.buy_item, name='buy_item'),
    path('un_buy_item/<int:item_id>/', views.un_buy_item, name='un_buy_item'),
    path('sign_out/', views.sign_out, name='sign_out'),
]