from typing import Union

from django.test import TestCase
from model_bakery import baker  # type: ignore

from auth.services import AuthUser
from users.services import User, UserService


class TestUserService(TestCase):
    def test_get_user_from_user_model(self) -> None:
        user_model = baker.make("users.User")

        user: User = UserService.get_user_from_user_model(user_model)

        self.assertEqual(user.id, user_model.id)
        self.assertEqual(user.email, user_model.email)
        self.assertEqual(user.date_created, user_model.date_created)

        self.assertIsInstance(user, User)

    def test_get_user_from_auth_user_exists(self) -> None:
        auth_user = AuthUser(
            id="1234567890",
            email="ben_franklin@upenn.edu",
            email_verified=True,
        )
        user: Union[User, None] = UserService.get_user_from_auth_user(auth_user)
        self.assertIsNone(user)

    def test_get_user_from_auth_user_does_not_exist(self) -> None:
        user_model = baker.make("users.User")
        auth_user = AuthUser(
            id=user_model.id,
            email=user_model.email,
            email_verified=True,
        )

        user: Union[User, None] = UserService.get_user_from_auth_user(auth_user)

        self.assertIsNotNone(user)
        self.assertEqual(user.id, user_model.id)  # type: ignore
        self.assertEqual(user.email, user_model.email)  # type: ignore
