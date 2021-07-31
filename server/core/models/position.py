from django.db import models
from django.utils.timezone import now
from core.models import Division


class Position(models.Model):
    name = models.CharField(max_length=64)
    division = models.ForeignKey(Division, on_delete=models.CASCADE)

    date_created = models.DateTimeField(default=now, editable=False)

    def __str__(self) -> str:
        return f"{self.division}, {self.name}"
