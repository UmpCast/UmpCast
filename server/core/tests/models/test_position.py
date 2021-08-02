from django.test import TestCase
from core.models import Position, Division, Season, Organization
from model_bakery import baker
from django.db import IntegrityError


class PositionTest(TestCase):
    def test_create(self):
        division = baker.make(Division)
        position = Position.objects.create(
            name="Base",
            division=division,
        )
        self.assertIsInstance(position, Position)

    def test_str(self):
        season = baker.make(
            Season,
            name="2021 Fall",
        )
        division = baker.make(
            Division,
            season=season,
            name="Majors",
        )
        position = Position.objects.create(
            name="Base",
            division=division,
        )
        self.assertEqual(str(position), "2021 Fall, Majors Base")

    def test_name_non_nullable(self):
        division = baker.make(Division)
        self.assertRaises(
            IntegrityError,
            lambda: Position.objects.create(
                name=None,
                division=division,
            ),
        )

    def test_division_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: Position.objects.create(
                name="Base",
                division=None,
            ),
        )

    def test_date_created_auto_now_add(self):
        position = baker.make(Position)
        self.assertIsNotNone(position.date_created)
