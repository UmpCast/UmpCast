import base64
from datetime import datetime
from typing import Optional
from uuid import uuid4

from django.core.files.base import ContentFile
from pydantic import BaseModel


class CreateOrganizationInput(BaseModel):
    name: str
    description: Optional[str]
    email: Optional[str]
    logo_b_64: Optional[str]
    website_url: Optional[str]


class UpdateOrganizationInput(BaseModel):
    organization_id: int
    name: Optional[str]
    description: Optional[str]
    email: Optional[str]
    logo_b_64: Optional[str]
    website_url: Optional[str]

    @property
    def logo(self) -> Optional[ContentFile]:
        if self.logo_b_64 is not None:
            format, img_str = self.logo_b_64.split(";base64,")
            ext = format.split("/")[-1]
            return ContentFile(base64.b64decode(img_str), name=uuid4().hex + "." + ext)
        return None

    def dict(self) -> dict:
        values = super().dict(
            exclude_unset=True, exclude={"organization_id", "logo_b_64"}
        )
        if self.logo is not None:
            values["logo"] = self.logo
        return values


class CreateSeasonInput(BaseModel):
    organization_id: int
    name: str
    end_date: datetime


class UpdateSeasonInput(BaseModel):
    season_id: int
    name: Optional[str]
    end_date: Optional[datetime]

    def dict(self) -> dict:
        return super().dict(exclude_unset=True, exclude={"season_id"})


class CreateDivisionInput(BaseModel):
    name: str
    season_id: int


class UpdateSeasonInput(BaseModel):
    division_id: int
    name: Optional[str]
