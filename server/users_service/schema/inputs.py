from typing import Optional

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
    street_address: Optional[str]
    city: Optional[str]
    state: Optional[str]
    zip_code: Optional[str]
