from django.test import TestCase
from core.models import Location, Season
from model_bakery import baker
from django.db import IntegrityError


class LocationTest(TestCase):
    def test_create(self):
        season = baker.make(Season)
        location = Location.objects.create(
            season=season,
            name="Middlefield Ballpark",
        )
        self.assertIsInstance(location, Location)

    def test_str(self):
        season = baker.make(Season)
        location = baker.make(
            Location,
            season=season,
            name="Middlefield Ballpark",
        )
        self.assertEqual(str(location), f"{season.name}, Middlefield Ballpark")

    def test_name_non_nullable(self):
        season = baker.make(Season)
        self.assertRaises(
            IntegrityError,
            lambda: Location.objects.create(
                name=None,
                season=season,
            ),
        )

    def test_season_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: Location.objects.create(
                name="Majors",
                season=None,
            ),
        )

    def test_date_created_auto_now_add(self):
        location = baker.make(Location)
        self.assertIsNotNone(location.date_created)
