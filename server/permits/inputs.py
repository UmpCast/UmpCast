from typing import Optional

from pydantic import BaseModel


class OrganizationPermitInput(BaseModel):
    is_owner: Optional[bool]
    is_member: Optional[bool]
