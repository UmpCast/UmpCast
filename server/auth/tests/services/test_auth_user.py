from django.test import TestCase

from auth.services import AnonymousUser, AuthUser, FireBaseUser


class TestAuthUser(TestCase):
    def test_auth_user_create(self) -> None:
        auth_user = AuthUser(
            id="1234567890",
            email="ben_franklin@upenn.edu",
            email_verified=True,
        )
        self.assertEqual(auth_user.id, "1234567890")
        self.assertEqual(auth_user.email, "ben_franklin@upenn.edu")
        self.assertTrue(auth_user.email_verified)

        self.assertIsInstance(auth_user, AuthUser)
        self.assertNotIsInstance(auth_user, FireBaseUser)
        self.assertNotIsInstance(auth_user, AnonymousUser)


class TestFireBaseUser(TestCase):
    def test_firebase_user_create(self) -> None:
        firebase_user = FireBaseUser(
            id="1234567890",
            email="ben_franklin@upenn.edu",
            email_verified=True,
        )
        self.assertEqual(firebase_user.id, "1234567890")
        self.assertEqual(firebase_user.email, "ben_franklin@upenn.edu")
        self.assertTrue(firebase_user.email_verified)

        self.assertIsInstance(firebase_user, AuthUser)
        self.assertIsInstance(firebase_user, FireBaseUser)
        self.assertNotIsInstance(firebase_user, AnonymousUser)


class TestAnonymousUser(TestCase):
    def test_anonymous_user_create(self) -> None:
        anonymous_user = AnonymousUser()
        self.assertEqual(anonymous_user.id, "")
        self.assertEqual(anonymous_user.email, "")
        self.assertFalse(anonymous_user.email_verified)

        self.assertIsInstance(anonymous_user, AuthUser)
        self.assertNotIsInstance(anonymous_user, FireBaseUser)
        self.assertIsInstance(anonymous_user, AnonymousUser)
