from typing import Optional

from pydantic import BaseModel


class OrganizationInput(BaseModel):
    name: Optional[str]
    email: Optional[str]
    website_url: Optional[str]
