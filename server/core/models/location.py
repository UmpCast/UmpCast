from django.db import models
from django.utils.timezone import now
from core.models import season


class Location(models.Model):
    name = models.CharField(max_length=64)
    season = models.ForeignKey(season.Season, on_delete=models.CASCADE)

    date_created = models.DateTimeField(default=now, editable=False)

    def __str__(self):
        return f"{self.season.name}, {self.name}"
