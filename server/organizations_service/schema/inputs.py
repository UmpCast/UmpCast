from pydantic import BaseModel


class CreateOrganizationInput(BaseModel):
    name: str
