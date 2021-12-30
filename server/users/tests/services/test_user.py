from datetime import datetime

from django.test import TestCase

from users.services import User


class UserTest(TestCase):
    def test_user_create(self) -> None:
        user = User(
            id="1234567890",
            email="ben_franklin@upenn.edu",
            date_created=datetime(year=2000, month=1, day=1),
            first_name="Benjamin",
            last_name="Franklin",
            street_address="Walnut Street",
            city="Philadelphia",
            state="Pennsylvania",
            zip_code=19104,
            phone_number="2158986636",
        )
        self.assertEqual(user.id, "1234567890")
        self.assertEqual(user.email, "ben_franklin@upenn.edu")
        self.assertEqual(user.date_created, datetime(year=2000, month=1, day=1))
        self.assertEqual(user.first_name, "Benjamin")
        self.assertEqual(user.last_name, "Franklin")
        self.assertEqual(user.street_address, "Walnut Street")
        self.assertEqual(user.city, "Philadelphia")
        self.assertEqual(user.state, "Pennsylvania")
        self.assertEqual(user.zip_code, 19104)
        self.assertEqual(user.phone_number, "2158986636")

        self.assertIsInstance(user, User)
