from django.db import models
from django.utils.timezone import now
from core.models import Organization


class Season(models.Model):
    name = models.CharField(max_length=64)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)

    start_date = models.DateTimeField(default=now)
    end_date = models.DateTimeField(default=now)

    date_created = models.DateTimeField(default=now, editable=False)

    def __str__(self) -> str:
        return f"{self.organization.name}, {self.name}"
