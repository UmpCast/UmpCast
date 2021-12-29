from django.test import TestCase
from email_verification.services import EmailVerificationInput
from pydantic import ValidationError


class TestEmailVerificationInput(TestCase):
    def test_create_email_verification_input_valid(self) -> None:
        email_input = EmailVerificationInput(email="ben_franklin@upenn.edu")
        self.assertEqual(email_input.email, "ben_franklin@upenn.edu")

    def test_create_email_verification_input_invalid(self) -> None:
        with self.assertRaises(ValidationError):
            EmailVerificationInput(email="email")
