from django.db import models
from django.utils.timezone import now
from django.conf import settings
from core.models import Season


class UserSeason(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    season = models.ForeignKey(Season, on_delete=models.CASCADE)

    PERMISSION_CHOICES = (
        ("admin", "admin"),
        ("user", "user"),
    )

    permission_type = models.CharField(
        max_length=10,
        choices=PERMISSION_CHOICES,
        default="user",
    )

    date_created = models.DateTimeField(default=now, editable=False)

    def __str__(self) -> str:
        return f"{self.user}, {self.season}, {self.permission_type}"
