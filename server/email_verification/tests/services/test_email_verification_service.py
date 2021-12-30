from unittest import mock

from django.test import TestCase
from pydantic import ValidationError

from email_verification.services import EmailVerificationInput, EmailVerificationService


class TestEmailVerificationService(TestCase):
    def setUp(self) -> None:
        self.email_input: EmailVerificationInput = (
            EmailVerificationService.get_email_verification_input(
                email="ben_franklin@upenn.edu"
            )
        )
        self.email_verification_service = EmailVerificationService(self.email_input)

    @mock.patch(
        "email_verification.services.email_verification_service.auth.ActionCodeSettings"
    )
    @mock.patch(
        "email_verification.services.email_verification_service.auth.generate_email_verification_link"
    )
    def test_get_email_verification_link(
        self,
        mock_generate_email_verification_link: mock.MagicMock,
        mock_action_code_settings: mock.MagicMock,
    ) -> None:
        mock_generate_email_verification_link.return_value = "link"
        mock_action_code_settings.return_value = "action_code_settings"

        kwargs = {
            "url": "url",
            "ios_bundle_id": "ios_bundle_id",
            "android_package_name": "android_package_name",
            "android_minimum_version": "android_minimum_version",
            "dynamic_link_domain": "dynamic_link_domain",
        }

        link = self.email_verification_service.get_email_verification_link(**kwargs)

        mock_action_code_settings.assert_called_once_with(
            **kwargs,
            handle_code_in_app=True,
            android_install_app=True,
        )
        mock_generate_email_verification_link.assert_called_once_with(
            email=self.email_input.email,
            action_code_settings="action_code_settings",
        )

        self.assertEqual(link, "link")

    @mock.patch("email_verification.services.email_verification_service.send_mail")
    def test_send_email_verification_email(
        self, mock_send_mail: mock.MagicMock
    ) -> None:
        self.email_verification_service.send_email_verification_email(
            link="http://upenn.edu"
        )

        self.assertIn(
            "http://upenn.edu",
            mock_send_mail.call_args[1]["message"],
        )
        self.assertIn(
            "ben_franklin@upenn.edu",
            mock_send_mail.call_args[1]["recipient_list"],
        )

    def test_get_email_verification_input_valid(self) -> None:
        email_input: EmailVerificationInput = (
            EmailVerificationService.get_email_verification_input(
                email="ben_franklin@upenn.edu"
            )
        )
        self.assertEqual(email_input.email, "ben_franklin@upenn.edu")

    def test_get_email_verification_input_invalid(self) -> None:
        with self.assertRaises(ValidationError):
            EmailVerificationService.get_email_verification_input(email="email")
