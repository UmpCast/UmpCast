from django.test import TestCase
from auth.context import get_jwt_token, get_context_value
from unittest import mock
from auth.services import AuthUser, AnonymousUser, FireBaseUser


class TestContext(TestCase):
    def setUp(self) -> None:
        self.request = mock.Mock()
        self.request.headers = {}

    def test_get_jwt_token_empty(self) -> None:
        result = get_jwt_token(self.request)
        self.assertEqual(result, "")

    def test_get_jwt_token_short(self) -> None:
        self.request.headers["Authorization"] = "jwt"
        result = get_jwt_token(self.request)
        self.assertEqual(result, "")

    def test_get_jwt_token_long(self) -> None:
        self.request.headers["Authorization"] = "jwt jwt jwt"
        result = get_jwt_token(self.request)
        self.assertEqual(result, "")

    def test_get_jwt_token_invalid(self) -> None:
        self.request.headers["Authorization"] = "bearer token"
        result = get_jwt_token(self.request)
        self.assertEqual(result, "")

    def test_get_jwt_token_valid_1(self) -> None:
        self.request.headers["Authorization"] = "jwt token"
        result = get_jwt_token(self.request)
        self.assertEqual(result, "token")

    def test_get_jwt_token_valid_2(self) -> None:
        self.request.headers["Authorization"] = "JWT token"
        result = get_jwt_token(self.request)
        self.assertEqual(result, "token")

    @mock.patch("auth.context.auth.verify_id_token")
    @mock.patch("auth.context.get_jwt_token")
    def test_get_context_value_invalid_token_format(
        self,
        mock_get_jwt_token: mock.MagicMock,
        mock_verify_id_token: mock.MagicMock,
    ) -> None:
        mock_get_jwt_token.return_value = ""

        response = get_context_value(self.request)

        mock_get_jwt_token.assert_called_once_with(self.request)
        mock_verify_id_token.assert_not_called()

        self.assertEqual(response["request"], self.request)
        self.assertIsInstance(response["auth_user"], AuthUser)
        self.assertIsInstance(response["auth_user"], AnonymousUser)

    @mock.patch("auth.context.auth.verify_id_token")
    @mock.patch("auth.context.get_jwt_token")
    def test_get_context_value_invalid_firebase_token(
        self,
        mock_get_jwt_token: mock.MagicMock,
        mock_verify_id_token: mock.MagicMock,
    ) -> None:
        mock_get_jwt_token.return_value = "token"
        mock_verify_id_token.side_effect = Exception("Firebase Token Error")

        response = get_context_value(self.request)

        mock_get_jwt_token.assert_called_once_with(self.request)
        mock_verify_id_token.assert_called_once_with("token")

        self.assertEqual(response["request"], self.request)
        self.assertIsInstance(response["auth_user"], AuthUser)
        self.assertIsInstance(response["auth_user"], AnonymousUser)

    @mock.patch("auth.context.auth.verify_id_token")
    @mock.patch("auth.context.get_jwt_token")
    def test_get_context_value_valid_firebase_token(
        self,
        mock_get_jwt_token: mock.MagicMock,
        mock_verify_id_token: mock.MagicMock,
    ) -> None:
        mock_get_jwt_token.return_value = "token"
        mock_verify_id_token.return_value = {
            "uid": "1234567890",
            "email": "ben_franklin@upenn.edu",
            "email_verified": True,
        }

        response = get_context_value(self.request)

        mock_get_jwt_token.assert_called_once_with(self.request)
        mock_verify_id_token.assert_called_once_with("token")

        self.assertEqual(response["request"], self.request)
        self.assertIsInstance(response["auth_user"], AuthUser)
        self.assertIsInstance(response["auth_user"], FireBaseUser)

        self.assertEqual(response["auth_user"].id, "1234567890")
        self.assertEqual(response["auth_user"].email, "ben_franklin@upenn.edu")
        self.assertTrue(response["auth_user"].email_verified)
