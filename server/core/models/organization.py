from django.db import models
from django.conf import settings
from django.utils.timezone import now


class Organization(models.Model):
    name = models.CharField(max_length=64, unique=True, db_index=True)
    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through="UserOrganization",
    )

    email = models.EmailField(max_length=64, blank=True, null=True)
    website_url = models.CharField(max_length=64, blank=True, null=True)

    date_created = models.DateTimeField(default=now, editable=False)

    def __str__(self) -> str:
        return self.name


class UserOrganization(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    is_owner = models.BooleanField(default=False)
