from typing import Union
from django.test import TestCase
from users.services import UserService, User
from auth.services import AuthUser
from model_bakery import baker


class TestUserService(TestCase):
    def test_get_user_from_models_none(self) -> None:
        user_model = baker.make("users.User")

        user: User = UserService.get_user_from_models(user_model, None)

        self.assertEqual(user.id, user_model.id)
        self.assertEqual(user.email, user_model.email)
        self.assertEqual(user.date_created, user_model.date_created)
        self.assertEqual(user.first_name, "UmpireCast")
        self.assertEqual(user.last_name, "User")
        self.assertEqual(user.street_address, "100 UmpireCast Way")
        self.assertEqual(user.city, "Palo Alto")
        self.assertEqual(user.state, "California")
        self.assertEqual(user.zip_code, 94303)
        self.assertEqual(user.phone_number, "650123123")

        self.assertIsInstance(user, User)

    def test_get_user_from_models_not_none(self):
        user_model = baker.make("users.User")
        user_profile_model = baker.make("users.UserProfile", user=user_model)

        user: User = UserService.get_user_from_models(user_model, user_profile_model)

        self.assertEqual(user.id, user_model.id)
        self.assertEqual(user.email, user_model.email)
        self.assertEqual(user.date_created, user_model.date_created)
        self.assertEqual(user.first_name, user_profile_model.first_name)
        self.assertEqual(user.last_name, user_profile_model.last_name)
        self.assertEqual(user.street_address, user_profile_model.street_address)
        self.assertEqual(user.city, user_profile_model.city)
        self.assertEqual(user.state, user_profile_model.state)
        self.assertEqual(user.zip_code, user_profile_model.zip_code)
        self.assertEqual(user.phone_number, user_profile_model.phone_number)

        self.assertIsInstance(user, User)

    def test_get_user_from_auth_user_not_exists(self):
        auth_user = AuthUser(
            id="1234567890",
            email="ben_franklin@upenn.edu",
            email_verified=True,
        )
        user: Union[User, None] = UserService.get_user_from_auth_user(auth_user)
        self.assertIsNone(user)

    def test_get_user_from_auth_user_exists_no_profile(self):
        user_model = baker.make("users.User")
        auth_user = AuthUser(
            id=user_model.id,
            email=user_model.email,
            email_verified=True,
        )

        user: Union[User, None] = UserService.get_user_from_auth_user(auth_user)

        self.assertIsNotNone(user)
        self.assertEqual(user.id, user_model.id)
        self.assertEqual(user.email, user_model.email)
        self.assertEqual(user.first_name, "UmpireCast")
        self.assertEqual(user.last_name, "User")
        self.assertEqual(user.street_address, "100 UmpireCast Way")
        self.assertEqual(user.city, "Palo Alto")
        self.assertEqual(user.state, "California")
        self.assertEqual(user.zip_code, 94303)
        self.assertEqual(user.phone_number, "650123123")

    def test_get_user_from_auth_user_exists_with_profile(self):
        user_model = baker.make("users.User")
        user_profile_model = baker.make("users.UserProfile", user=user_model)
        auth_user = AuthUser(
            id=user_model.id,
            email=user_model.email,
            email_verified=True,
        )

        user: Union[User, None] = UserService.get_user_from_auth_user(auth_user)

        self.assertIsNotNone(user)
        self.assertEqual(user.id, user_model.id)
        self.assertEqual(user.email, user_model.email)
        self.assertEqual(user.date_created, user_model.date_created)
        self.assertEqual(user.first_name, user_profile_model.first_name)
        self.assertEqual(user.last_name, user_profile_model.last_name)
        self.assertEqual(user.street_address, user_profile_model.street_address)
        self.assertEqual(user.city, user_profile_model.city)
        self.assertEqual(user.state, user_profile_model.state)
        self.assertEqual(user.zip_code, user_profile_model.zip_code)
        self.assertEqual(user.phone_number, user_profile_model.phone_number)
