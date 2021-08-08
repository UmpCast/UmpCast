from django.test import TestCase
from core.models import Game, Division, Location, Team
from model_bakery import baker
from django.db import IntegrityError
from django.utils import timezone


class GameTest(TestCase):
    def test_create(self):
        game = Game.objects.create(
            division=baker.make(Division),
            location=baker.make(Location),
            home_team=baker.make(Team),
            away_team=baker.make(Team),
            date_time=timezone.now(),
        )
        self.assertIsInstance(game, Game)

    def test_str(self):
        game = baker.make(Game)
        self.assertEqual(str(game), f"{game.away_team.name} vs. {game.home_team.name}")

    def test_division_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: Game.objects.create(
                division=None,
                location=baker.make(Location),
                home_team=baker.make(Team),
                away_team=baker.make(Team),
                date_time=timezone.now(),
            ),
        )

    def test_location_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: Game.objects.create(
                division=baker.make(Division),
                location=None,
                home_team=baker.make(Team),
                away_team=baker.make(Team),
                date_time=timezone.now(),
            ),
        )

    def test_home_team_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: Game.objects.create(
                division=baker.make(Division),
                location=baker.make(Location),
                home_team=None,
                away_team=baker.make(Team),
                date_time=timezone.now(),
            ),
        )

    def test_away_team_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: Game.objects.create(
                division=baker.make(Division),
                location=baker.make(Location),
                home_team=baker.make(Team),
                away_team=None,
                date_time=timezone.now(),
            ),
        )

    def test_date_time_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: Game.objects.create(
                division=baker.make(Division),
                location=baker.make(Location),
                home_team=baker.make(Team),
                away_team=baker.make(Team),
                date_time=None,
            ),
        )

    def test_date_created_auto_now_add(self):
        game = baker.make(Game)
        self.assertIsNotNone(game.date_created)
