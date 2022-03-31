from django.db import models


class UserOrganization(models.Model):
    user_id = models.CharField(max_length=255)
    organization_id = models.CharField(max_length=255)

    is_owner = models.BooleanField(default=False)
    is_member = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
