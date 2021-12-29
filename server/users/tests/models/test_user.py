from django.db import IntegrityError
from django.test import TestCase

from users.models import User


class UserModelManagerTest(TestCase):
    def test_object_manager_create_user(self) -> None:
        user = User.objects.create_user(
            email="ben_franklin@upenn.edu",
            password="benfranklin123",
        )
        self.assertIsInstance(user, User)
        self.assertFalse(user.is_superuser)
        self.assertFalse(user.is_staff)

    def test_object_manager_create_user_with_id(self) -> None:
        id = "1234567890"
        user = User.objects.create_user(
            id=id,
            email="ben_franklin@upenn.edu",
            password="benfranklin123",
        )
        self.assertEqual(user.id, id)
        self.assertIsInstance(user, User)
        self.assertFalse(user.is_superuser)
        self.assertFalse(user.is_staff)

    def test_object_manager_create_user_sets_password(self) -> None:
        user = User.objects.create_user(
            email="ben_franklin@upenn.edu",
            password="benfranklin123",
        )
        self.assertTrue(user.check_password("benfranklin123"))

    def test_object_manager_create_user_hashes_password(self) -> None:
        user = User.objects.create_user(
            email="ben_franklin@upenn.edu",
            password="benfranklin123",
        )
        self.assertNotEqual(user.password, "benfranklin123")

    def test_object_manager_create_superuser(self) -> None:
        user = User.objects.create_superuser(
            email="george_washington@gtown.edu",
            password="georgewashington123",
        )
        self.assertIsInstance(user, User)
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

    def test_object_manager_create_superuser_with_id(self) -> None:
        id = "1234567890"
        user = User.objects.create_superuser(
            id=id,
            email="george_washington@gtown.edu",
            password="georgewashington123",
        )
        self.assertEqual(user.id, id)
        self.assertIsInstance(user, User)
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

    def test_object_manager_create_superuser_sets_password(self) -> None:
        user = User.objects.create_superuser(
            email="george_washington@gtown.edu",
            password="georgewashington123",
        )
        self.assertTrue(user.check_password("georgewashington123"))

    def test_object_manager_create_superuser_hashes_password(self) -> None:
        user = User.objects.create_superuser(
            email="george_washington@gtown.edu",
            password="georgewashington123",
        )
        self.assertNotEqual(user.password, "georgewashington123")


class UserModelTest(TestCase):
    def test_default_create_user(self) -> None:
        user = User.objects.create(
            email="ben_franklin@upenn.edu",
            password="benfranklin123",
        )
        self.assertIsInstance(user, User)
        self.assertNotEqual(len(user.id), 0)  # tests generate_uuid

    def test_email_non_nullable(self) -> None:
        self.assertRaises(
            IntegrityError,
            lambda: User.objects.create(
                email=None,
                password="benfranklin123",
            ),
        )

    def test_date_joined_auto_now(self) -> None:
        user = User.objects.create(
            email="ben_franklin@upenn.edu",
            password="benfranklin123",
        )
        self.assertIsNotNone(user.date_created)

    def test_duplicate_user_validations_email(self) -> None:
        test_1 = User.objects.create(
            email="ben_franklin@upenn.edu",
            password="benfranklin123",
        )
        self.assertRaises(
            IntegrityError,
            lambda: User.objects.create(
                email="ben_franklin@upenn.edu",
                password="benfranklin123",
            ),
        )

    def test_duplicate_user_validations_id(self) -> None:
        test_1 = User.objects.create(
            id="0",
            email="ben_franklin@upenn.edu",
            password="benfranklin123",
        )
        self.assertRaises(
            IntegrityError,
            lambda: User.objects.create(
                id="0",
                email="george_washington@gtown.edu",
                password="georgewashington123",
            ),
        )

    def test_str(self) -> None:
        user = User.objects.create(
            email="ben_franklin@upenn.edu",
            password="benfranklin123",
        )
        self.assertEquals(str(user), "ben_franklin@upenn.edu")
