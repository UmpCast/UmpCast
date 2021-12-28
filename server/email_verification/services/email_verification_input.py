from pydantic import BaseModel, validator
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


class EmailVerificationInput(BaseModel):
    email: str

    @validator("email")
    def email_validator(cls, email: str) -> str:
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError("Invalid email address")
        return email
