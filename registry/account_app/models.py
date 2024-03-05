from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    registry_type = models.CharField(max_length=50, choices=[('gift', 'Gift Registry'), ('wedding', 'Wedding Registry'), ('baby', 'Baby Registry')])

    def __str__(self):
        return self.user.username