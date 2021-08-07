from core.services import UserService
from django.test import TestCase
from model_bakery import baker
from core.models import User, Season, Organization, UserSeason


class UserServiceTest(TestCase):
    def test_current_user(self):
        user = baker.make(User)
        user_service = UserService(user)
        current_user = user_service.current_user()
        self.assertEqual(user, current_user)

    def test_owned_organizations(self):
        user = baker.make(User)
        user_service = UserService(user)

        organization = baker.make(Organization)
        organization.members.add(user, through_defaults={"is_owner": True})

        self.assertEqual(
            1,
            len(user_service.owned_organizations()),
        )

    def test_admin_seasons(self):
        user = baker.make(User)
        user_service = UserService(user)

        baker.make(
            UserSeason,
            user=user,
            season=baker.make(Season),
            permission_type="admin",
        )

        self.assertEqual(
            1,
            len(user_service.admin_seasons()),
        )

    def test_referee_seasons(self):
        user = baker.make(User)
        user_service = UserService(user)

        baker.make(
            UserSeason,
            user=user,
            season=baker.make(Season),
            permission_type="referee",
        )

        self.assertEqual(
            1,
            len(user_service.referee_seasons()),
        )
