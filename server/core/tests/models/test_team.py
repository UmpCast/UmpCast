from django.test import TestCase
from core.models import Season, Team, Organization
from model_bakery import baker
from django.db import IntegrityError


class TeamTest(TestCase):
    def test_create(self):
        season = baker.make(Season)
        team = Team.objects.create(
            name="Hengehold",
            season=season,
        )
        self.assertIsInstance(team, Team)

    def test_str(self):
        organization = baker.make(
            Organization,
            name="Palo Alto Little League",
        )
        season = baker.make(
            Season,
            name="Fall 2021",
            organization=organization,
        )
        team = Team.objects.create(
            name="Hengehold",
            season=season,
        )
        self.assertEqual(
            str(team),
            "Palo Alto Little League, Fall 2021, Hengehold",
        )

    def test_name_non_nullable(self):
        season = baker.make(Season)
        self.assertRaises(
            IntegrityError,
            lambda: Team.objects.create(
                name=None,
                season=season,
            ),
        )

    def test_season_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: Team.objects.create(name="Hengehold", season=None),
        )

    def test_date_created_auto_now_add(self):
        team = baker.make(Team)
        self.assertIsNotNone(team.date_created)
