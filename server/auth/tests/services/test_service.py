import unittest.mock as mock

from django.test import TestCase

from auth.services import AnonymousUser, AuthService, AuthUser, FireBaseUser


class AuthServiceTest(TestCase):
    @mock.patch.object(FireBaseUser, "__init__", return_value=None)
    def test_get_firebase_user(self, mock_method: mock.MagicMock) -> None:
        firebase_user: AuthUser = AuthService.get_firebase_user(
            id="1234567890",
            email="ben_franklin@upenn.edu",
            email_verified=True,
        )
        mock_method.assert_called_once_with(
            id="1234567890",
            email="ben_franklin@upenn.edu",
            email_verified=True,
        )
        self.assertIsInstance(firebase_user, AuthUser)
        self.assertIsInstance(firebase_user, FireBaseUser)

    @mock.patch.object(AnonymousUser, "__init__", return_value=None)
    def test_get_anonymous_user(self, mock_method: mock.MagicMock) -> None:
        anonymous_user: AuthUser = AuthService.get_anonymous_user()
        mock_method.assert_called_once()
        self.assertIsInstance(anonymous_user, AuthUser)
        self.assertIsInstance(anonymous_user, AnonymousUser)
