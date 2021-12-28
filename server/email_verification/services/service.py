from .email_verification_input import EmailVerificationInput
from pydantic import ValidationError
from firebase_admin import auth
from django.core.mail import send_mail


class EmailVerificationService:
    def __init__(self, email_verification_input: EmailVerificationInput):
        self.email_verification_input = email_verification_input

    def get_email_verification_link(
        self,
        url,
        ios_bundle_id,
        android_package_name,
        android_minimum_version,
        dynamic_link_domain,
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
        link = auth.generate_email_verification_link(
            email=email,
            action_code_settings=action_code_settings,
        )
        return link

    def send_email_verification_email(self, link) -> None:
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