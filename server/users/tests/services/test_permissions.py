from django.test import TestCase
from users.services import UserPermission
from auth.services import AuthUser


class TestUserPermission(TestCase):
    def test_has_resolve_me_permission(self) -> None:
        auth_user: AuthUser = AuthUser(
            id="1234567890",
            email="ben_franklin@upenn.edu",
            email_verified=True,
        )
        user_permission: UserPermission = UserPermission(auth_user)

        has_permission: bool = user_permission.has_resolve_me_permission()

        self.assertTrue(has_permission)
