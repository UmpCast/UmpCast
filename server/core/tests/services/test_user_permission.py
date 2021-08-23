from core.services import UserPermission
from django.test import TestCase
from model_bakery import baker
from core.models import User


class UserPermissionTest(TestCase):
    def test_has_resolve_organizations_permission(self):
        user_1 = baker.make(User)
        user_2 = baker.make(User)

        user_permission = UserPermission(user_1)

        self.assertTrue(
            user_permission.has_resolve_organizations_permission(user_1),
        )
        self.assertFalse(
            user_permission.has_resolve_organizations_permission(user_2),
        )

    def test_has_resolve_seasons_permission(self):
        user_1 = baker.make(User)
        user_2 = baker.make(User)

        user_permission = UserPermission(user_1)

        self.assertTrue(
            user_permission.has_resolve_seasons_permission(user_1),
        )
        self.assertFalse(
            user_permission.has_resolve_seasons_permission(user_2),
        )

    def test_is_user_owner(self):
        user_1 = baker.make(User)
        user_2 = baker.make(User)

        user_permission = UserPermission(user_1)

        self.assertTrue(user_permission.is_user_owner(user_1))
        self.assertFalse(user_permission.is_user_owner(user_2))
