from django.db import models
from django.utils.timezone import now
from core.models import Game, Position, UserSeason
from django.dispatch import receiver
from django.db.models.signals import post_save


class Listing(models.Model):
    game = models.ForeignKey(
        Game,
        on_delete=models.CASCADE,
    )
    position = models.ForeignKey(
        Position,
        on_delete=models.CASCADE,
    )
    user_season = models.ForeignKey(
        UserSeason,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    date_created = models.DateTimeField(default=now, editable=False)

    def __str__(self) -> str:
        return f"{self.game} {self.position.name}"


@receiver(post_save, sender=Game)
def create_listings_from_game(sender, instance, created, **kwargs):
    if created:
        for position in instance.division.position_set.all():
            Listing.objects.create(
                game=instance,
                position=position,
                user_season=None,
            )
