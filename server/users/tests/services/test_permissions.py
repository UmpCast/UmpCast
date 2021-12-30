from django.test import TestCase

from auth.services import AuthUser
from users.services import UserPermission


class UserPermissionTest(TestCase):
    def test_has_resolve_me_permission(self) -> None:
        auth_user: AuthUser = AuthUser(
            id="1234567890",
            email="ben_franklin@upenn.edu",
            email_verified=True,
        )
        user_permission: UserPermission = UserPermission(auth_user)

        has_permission: bool = user_permission.has_resolve_me_permission()

        self.assertTrue(has_permission)
