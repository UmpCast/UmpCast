import base64
from typing import Optional
from uuid import uuid4

from django.core.files.base import ContentFile
from pydantic import BaseModel


class CreateUserInput(BaseModel):
    first_name: str
    last_name: str
    phone_number: Optional[str]


class UpdateUserInput(BaseModel):
    id: str
    first_name: Optional[str]
    last_name: Optional[str]
    phone_number: Optional[str]
    profile_picture_b_64: Optional[str]
    street_address: Optional[str]
    city: Optional[str]
    state: Optional[str]
    zip_code: Optional[str]

    @property
    def profile_picture(self) -> Optional[ContentFile]:
        if self.profile_picture_b_64 is not None:
            format, img_str = self.profile_picture_b_64.split(";base64,")
            ext = format.split("/")[-1]
            return ContentFile(base64.b64decode(img_str), name=uuid4().hex + "." + ext)
        return None

    def dict(self) -> dict:
        values = super().dict(
            exclude_unset=True, exclude={"id", "profile_picture_b_64"}
        )
        if self.profile_picture is not None:
            values["profile_picture"] = self.profile_picture
        return values
