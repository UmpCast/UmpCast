from django.db import models

from .user import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)

    street_address = models.CharField(max_length=64)
    city = models.CharField(max_length=64)
    state = models.CharField(max_length=64)
    zip_code = models.IntegerField()

    phone_number = models.CharField(max_length=10)

    def __str__(self) -> str:
        return f"{self.user} UserProfile"
