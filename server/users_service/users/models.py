from django.db import models


class User(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    email = models.EmailField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

    street_address = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    state = models.CharField(max_length=255, null=True, blank=True)
    zip_code = models.CharField(max_length=5, null=True, blank=True)
    phone_number = models.CharField(max_length=10, null=True, blank=True)

    profile_picture = models.ImageField(
        upload_to="profile_pics/%Y/%m/", null=True, blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
