from django.test import TestCase
from users.services import User
from datetime import datetime


class TestUser(TestCase):
    def test_user_create(self):
        user = User(
            id="1234567890",
            email="ben_franklin@upenn.edu",
            date_created=datetime(year=2000, month=1, day=1),
        )
        self.assertEqual(user.id, "1234567890")
        self.assertEqual(user.email, "ben_franklin@upenn.edu")
        self.assertEqual(user.date_created, datetime(year=2000, month=1, day=1))

        self.assertIsInstance(user, User)
