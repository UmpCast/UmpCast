from django.test import TestCase
from core.models import Organization, Season
from model_bakery import baker
from django.db import IntegrityError


class SeasonTest(TestCase):
    def test_create(self):
        organization = baker.make(Organization)
        season = Season.objects.create(
            organization=organization,
            name="Fall 2021",
        )
        self.assertIsInstance(season, Season)

    def test_str(self):
        organization = baker.make(Organization, name="Palo Alto Little League")
        season = Season.objects.create(
            name="Fall 2021",
            organization=organization,
        )
        self.assertEqual(str(season), "Palo Alto Little League, Fall 2021")

    def test_name_non_nullable(self):
        organization = baker.make(Organization)
        with self.assertRaises(IntegrityError):
            Season.objects.create(
                name=None,
                organization=organization,
            )

    def test_organization_non_nullable(self):
        with self.assertRaises(IntegrityError):
            Season.objects.create(
                name="Fall 2021",
                organization=None,
            )

    def test_start_date_auto_now_add(self):
        season = baker.make(Season)
        self.assertIsNotNone(season.start_date)

    def test_end_date_auto_now_add(self):
        season = baker.make(Season)
        self.assertIsNotNone(season.end_date)

    def test_date_created_auto_now_add(self):
        season = baker.make(Season)
        self.assertIsNotNone(season.date_created)
