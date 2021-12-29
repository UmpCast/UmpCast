from django.core.mail import send_mail
from firebase_admin import auth  # type: ignore
from pydantic import ValidationError

from .email_verification_input import EmailVerificationInput


class EmailVerificationService:
    def __init__(self, email_verification_input: EmailVerificationInput):
        self.email_verification_input = email_verification_input

    def get_email_verification_link(
        self,
        url: str,
        ios_bundle_id: str,
        android_package_name: str,
        android_minimum_version: str,
        dynamic_link_domain: str,
    ) -> str:
        action_code_settings = auth.ActionCodeSettings(
            url=url,
            handle_code_in_app=True,
            ios_bundle_id=ios_bundle_id,
            android_package_name=android_package_name,
            android_install_app=True,
            android_minimum_version=android_minimum_version,
            dynamic_link_domain=dynamic_link_domain,
        )
        email = self.email_verification_input.email
        link: str = auth.generate_email_verification_link(
            email=email,
            action_code_settings=action_code_settings,
        )
        return link

    def send_email_verification_email(self, link: str) -> None:
        email = self.email_verification_input.email
        send_mail(
            subject="UmpireCast Email Verification",
            message=f"Please verify your email address with UmpireCast by clicking on the following link: {link}",
            from_email="developer@umpirecast.com",
            recipient_list=[email],
        )

    @classmethod
    def get_email_verification_input(cls, email: str) -> EmailVerificationInput:
        try:
            return EmailVerificationInput(email=email)
        except ValidationError as e:
            raise e
