from django.db import models
from django.utils.timezone import now
from core.models import Division
from core.models import Location
from core.models import Team


class Game(models.Model):
    division = models.ForeignKey(
        Division,
        on_delete=models.CASCADE,
    )
    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
    )
    home_team = models.ForeignKey(
        Team,
        related_name="home_team",
        on_delete=models.CASCADE,
    )
    away_team = models.ForeignKey(
        Team,
        related_name="away_team",
        on_delete=models.CASCADE,
    )
    date_time = models.DateTimeField()
    is_cancelled = models.BooleanField(default=False)

    date_created = models.DateTimeField(default=now, editable=False)

    def __str__(self) -> str:
        return f"{self.away_team.name} vs. {self.home_team.name}"
