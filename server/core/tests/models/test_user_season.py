from django.test import TestCase
from core.models import Season, UserSeason
from django.conf import settings
from model_bakery import baker
from django.db import IntegrityError


class UserSeasonTest(TestCase):
    def test_create(self):
        season = baker.make(Season)
        user = baker.make(settings.AUTH_USER_MODEL)
        user_season = UserSeason.objects.create(
            user=user,
            season=season,
            permission_type="user",
        )
        self.assertIsInstance(user_season, UserSeason)

    def test_str(self):
        user = baker.make(settings.AUTH_USER_MODEL)
        season = baker.make(Season, name="Fall 2021")
        user_season = UserSeason.objects.create(
            user=user,
            season=season,
            permission_type="user",
        )
        self.assertEqual(str(user_season), f"{user}, {season}, user")

    def test_user_non_nullable(self):
        season = baker.make(Season)
        self.assertRaises(
            IntegrityError,
            lambda: UserSeason.objects.create(
                user=None,
                season=season,
                permission_type="user",
            ),
        )

    def test_season_non_nullable(self):
        user = baker.make(settings.AUTH_USER_MODEL)
        self.assertRaises(
            IntegrityError,
            lambda: UserSeason.objects.create(
                user=user,
                season=None,
                permission_type="user",
            ),
        )

    def test_date_created_auto_now_add(self):
        user_season = baker.make(UserSeason)
        self.assertIsNotNone(user_season.date_created)
