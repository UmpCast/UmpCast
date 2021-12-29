from .user import User
from django.db import models


class UserProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)

    street_address = models.CharField(max_length=64)
    city = models.CharField(max_length=64)
    state = models.CharField(max_length=64)
    zip_code = models.IntegerField()

    phone_number = models.CharField(max_length=10)
