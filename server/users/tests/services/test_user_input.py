from django.test import TestCase
from pydantic import ValidationError

from users.services import UserInput


class UserInputTest(TestCase):
    def test_create_user_input_valid(self) -> None:
        kwargs = {
            "first_name": "Benjamin",
            "last_name": "Franklin",
            "street_address": "Walnut Street",
            "city": "Philadelphia",
            "state": "Pennsylvania",
            "zip_code": 19104,
            "phone_number": "2158986636",
        }
        user_input = UserInput(**kwargs)
        self.assertEqual(user_input.first_name, kwargs["first_name"])
        self.assertEqual(user_input.last_name, kwargs["last_name"])
        self.assertEqual(user_input.street_address, kwargs["street_address"])
        self.assertEqual(user_input.city, kwargs["city"])
        self.assertEqual(user_input.state, kwargs["state"])
        self.assertEqual(user_input.zip_code, kwargs["zip_code"])
        self.assertEqual(user_input.phone_number, kwargs["phone_number"])

    def test_create_user_input_invalid_zip_code(self) -> None:
        kwargs = {
            "first_name": "Benjamin",
            "last_name": "Franklin",
            "street_address": "Walnut Street",
            "city": "Philadelphia",
            "state": "Pennsylvania",
            "zip_code": 0,
            "phone_number": "2158986636",
        }
        with self.assertRaises(ValidationError):
            UserInput(**kwargs)

    def test_create_user_input_invalid_phone_number(self) -> None:
        kwargs = {
            "first_name": "Benjamin",
            "last_name": "Franklin",
            "street_address": "Walnut Street",
            "city": "Philadelphia",
            "state": "Pennsylvania",
            "zip_code": 19104,
            "phone_number": "0",
        }
        with self.assertRaises(ValidationError):
            UserInput(**kwargs)
