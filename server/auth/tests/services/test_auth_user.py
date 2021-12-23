from django.test import TestCase
from auth.services import AuthUser, FireBaseUser, AnonymousUser


class TestAuthUser(TestCase):
    def test_auth_user_create(self):
        auth_user = AuthUser(
            id="1234567890",
            email="ben_franklin@upenn.edu",
            email_verified=True,
        )
        self.assertEqual(auth_user.id, "1234567890")
        self.assertEqual(auth_user.email, "ben_franklin@upenn.edu")
        self.assertTrue(auth_user.email_verified)

        self.assertTrue(isinstance(auth_user, AuthUser))
        self.assertFalse(isinstance(auth_user, FireBaseUser))
        self.assertFalse(isinstance(auth_user, AnonymousUser))


class TestFireBaseUser(TestCase):
    def test_firebase_user_create(self):
        firebase_user = FireBaseUser(
            id="1234567890",
            email="ben_franklin@upenn.edu",
            email_verified=True,
        )
        self.assertEqual(firebase_user.id, "1234567890")
        self.assertEqual(firebase_user.email, "ben_franklin@upenn.edu")
        self.assertTrue(firebase_user.email_verified)

        self.assertTrue(isinstance(firebase_user, AuthUser))
        self.assertTrue(isinstance(firebase_user, FireBaseUser))
        self.assertFalse(isinstance(firebase_user, AnonymousUser))


class TestAnonymousUser(TestCase):
    def test_anonymous_user_create(self):
        anonymous_user = AnonymousUser()
        self.assertEqual(anonymous_user.id, "")
        self.assertEqual(anonymous_user.email, "")
        self.assertFalse(anonymous_user.email_verified)

        self.assertTrue(isinstance(anonymous_user, AuthUser))
        self.assertFalse(isinstance(anonymous_user, FireBaseUser))
        self.assertTrue(isinstance(anonymous_user, AnonymousUser))
