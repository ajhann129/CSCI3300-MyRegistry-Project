from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User
from registry_app.models import Wishlist  # Import your existing Wishlist model

class Item(models.Model):
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    description = models.TextField(blank=True)
    link = models.URLField(blank=True)  # Optional link field

    def __str__(self):
        return self.name