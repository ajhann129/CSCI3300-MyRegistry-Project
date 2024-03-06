from django.urls import path
from .views import index, signin, create_account

# App routing
urlpatterns = [
    path('', index, name='index'),
    path('signin/', signin, name='signin'),
    path('create_account/', create_account, name='create_account'),
]