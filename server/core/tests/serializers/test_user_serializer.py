from django.test import TestCase
from core.serializers import UserSerializer
from django.utils import timezone


class UserSerializerTest(TestCase):
    def test_create(self):
        serializer = UserSerializer(
            data={
                "email": "ben_franklin@upenn.edu",
                "password": "benfranklin123",
                "first_name": "Ben",
                "last_name": "Franklin",
            },
        )
        self.assertTrue(serializer.is_valid())
        user = serializer.save()

        self.assertEqual(user.email, "ben_franklin@upenn.edu")
        self.assertEqual(user.first_name, "Ben")
        self.assertEqual(user.last_name, "Franklin")
        self.assertTrue(user.check_password("benfranklin123"))

    def test_read_only_fields(self):
        now = timezone.now()
        serializer = UserSerializer(
            data={
                "email": "ben_franklin@upenn.edu",
                "password": "benfranklin123",
                "first_name": "Ben",
                "last_name": "Franklin",
                # read only fields
                "id": -1,
                "is_active": False,
                "is_staff": True,
                "is_superuser": True,
                "last_login": now,
                "date_created": now,
            },
        )
        self.assertTrue(serializer.is_valid())
        user = serializer.save()

        self.assertNotEqual(user.id, -1)
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertNotEqual(user.last_login, now)
        self.assertNotEqual(user.date_created, now)

    def test_write_only_fields(self):
        serializer = UserSerializer(
            data={
                "email": "ben_franklin@upenn.edu",
                "password": "benfranklin123",
                "first_name": "Ben",
                "last_name": "Franklin",
            },
        )
        self.assertTrue(serializer.is_valid())
        serializer.save()

        self.assertTrue("password" not in serializer.data)
