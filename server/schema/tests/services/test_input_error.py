from django.test import TestCase
from schema.services import InputError


class TestInputError(TestCase):
    def test_input_error_create(self) -> None:
        input_error = InputError(
            key="key",
            message="message",
        )
        self.assertEqual(input_error.key, "key")
        self.assertEqual(input_error.message, "message")

        self.assertIsInstance(input_error, InputError)
