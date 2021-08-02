from django.test import TestCase
from core.models import Division, Season
from model_bakery import baker
from django.db import IntegrityError


class DivisionTest(TestCase):
    def test_create(self):
        season = baker.make(Season)
        division = Division.objects.create(
            season=season,
            name="Majors",
        )
        self.assertIsInstance(division, Division)

    def test_str(self):
        season = baker.make(Season, name="Fall 2021")
        division = baker.make(
            Division,
            season=season,
            name="Majors",
        )
        self.assertEqual(str(division), "Fall 2021, Majors")

    def test_name_non_nullable(self):
        season = baker.make(Season)
        self.assertRaises(
            IntegrityError,
            lambda: Division.objects.create(
                name=None,
                season=season,
            ),
        )

    def test_season_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: Division.objects.create(
                name="Majors",
                season=None,
            ),
        )

    def test_date_created_auto_now_add(self):
        division = baker.make(Division)
        self.assertIsNotNone(division.date_created)
