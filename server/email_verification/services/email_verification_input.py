from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from pydantic import BaseModel, validator


class EmailVerificationInput(BaseModel):
    email: str

    @validator("email")
    def email_validator(cls, email: str) -> str:
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError("Invalid email address")
        return email
