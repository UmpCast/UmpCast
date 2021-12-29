from schema.types import mutation
from email_verification.services import EmailVerificationService, EmailVerificationInput
from utils.exceptions import ServerError
from pydantic import ValidationError
from typing import List, Dict, Any
from ariadne import convert_kwargs_to_snake_case
from ariadne.types import GraphQLResolveInfo
from schema.services import InputError
from utils.error_handling import get_input_errors


@mutation.field("sendEmailVerification")
@convert_kwargs_to_snake_case
def resolve_sendEmailVerification(
    _: Any,
    info: GraphQLResolveInfo,
    input: Dict[str, str],
    url: str,
    ios_bundle_id: str,
    android_package_name: str,
    android_minimum_version: str,
    dynamic_link_domain: str,
) -> Dict[str, List[InputError]]:
    try:
        email_input: EmailVerificationInput = (
            EmailVerificationService.get_email_verification_input(input["email"])
        )
        email_service = EmailVerificationService(email_input)
        link = email_service.get_email_verification_link(
            url=url,
            ios_bundle_id=ios_bundle_id,
            android_package_name=android_package_name,
            android_minimum_version=android_minimum_version,
            dynamic_link_domain=dynamic_link_domain,
        )
        email_service.send_email_verification_email(link)
    except ValidationError as e:
        return {
            "errors": get_input_errors(e),
        }
    except Exception as e:
        raise ServerError("Error sending email verification email")
    else:
        return {
            "errors": [],
        }
