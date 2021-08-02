from django.test import TestCase
from core.models import User
from django.db import IntegrityError
from model_bakery import baker


class UserModelManagerTest(TestCase):
    def test_object_manager_create_user(self):
        user = User.objects.create_user(
            email="ben_franklin@upenn.edu",
            first_name="Ben",
            last_name="Franklin",
            password="benfranklin123",
        )
        self.assertIsInstance(user, User)
        self.assertFalse(user.is_superuser)
        self.assertFalse(user.is_staff)

    def test_object_manager_create_superuser(self):
        user = User.objects.create_superuser(
            email="george_washington@gtown.edu",
            first_name="George",
            last_name="Washington",
            password="georgewashington123",
        )
        self.assertIsInstance(user, User)
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

    def test_object_manager_create_user_sets_password(self):
        user = User.objects.create_user(
            email="ben_franklin@upenn.edu",
            first_name="Ben",
            last_name="Franklin",
            password="benfranklin123",
        )
        self.assertTrue(user.check_password("benfranklin123"))

    def test_object_manager_create_superuser_sets_password(self):
        user = User.objects.create_superuser(
            email="george_washington@gtown.edu",
            first_name="George",
            last_name="Washington",
            password="georgewashington123",
        )
        self.assertTrue(user.check_password("georgewashington123"))

    def test_object_manager_create_user_hashes_password(self):
        user = User.objects.create_user(
            email="ben_franklin@upenn.edu",
            first_name="Ben",
            last_name="Franklin",
            password="benfranklin123",
        )
        self.assertNotEqual(user.password, "benfranklin123")

    def test_object_manager_create_superuser_hashes_password(self):
        user = User.objects.create_superuser(
            email="george_washington@gtown.edu",
            first_name="George",
            last_name="Washington",
            password="georgewashington123",
        )
        self.assertNotEqual(user.password, "georgewashington123")


class UserModelTest(TestCase):
    def test_get_full_name(self):
        user = baker.make(
            User,
            first_name="Benjamin",
            last_name="Franklin",
        )
        self.assertEqual(user.get_full_name(), "Benjamin Franklin")

    def test_get_short_name(self):
        user = baker.make(
            User,
            first_name="Benjamin",
        )
        self.assertEqual(user.get_short_name(), "Benjamin")

    def test_default_create_user(self):
        user = User.objects.create(
            email="ben_franklin@upenn.edu",
            first_name="Ben",
            last_name="Franklin",
            password="benfranklin123",
        )
        self.assertIsInstance(user, User)

    def test_email_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: User.objects.create(
                email=None,
                first_name="Ben",
                last_name="Franklin",
                password="benfranklin123",
            ),
        )

    def test_first_name_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: User.objects.create(
                email="ben_franklin@upenn.edu",
                first_name=None,
                last_name="Franklin",
                password="benfranklin123",
            ),
        )

    def test_last_name_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: User.objects.create(
                email="ben_franklin@upenn.edu",
                first_name="Ben",
                last_name=None,
                password="benfranklin123",
            ),
        )

    def test_date_joined_auto_now(self):
        user = User.objects.create(
            email="ben_franklin@upenn.edu",
            first_name="Ben",
            last_name="Franklin",
            password="benfranklin123",
        )
        self.assertIsNotNone(user.date_created)

    def test_duplicate_user_validations(self):
        test_1 = User.objects.create(
            email="ben_franklin@upenn.edu",
            first_name="Ben",
            last_name="Franklin",
            password="benfranklin123",
        )
        self.assertRaises(
            IntegrityError,
            lambda: User.objects.create(
                email="ben_franklin@upenn.edu",
                first_name="Ben",
                last_name="Franklin",
                password="benfranklin123",
            ),
        )
