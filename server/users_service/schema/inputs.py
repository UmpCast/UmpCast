from typing import Optional

from pydantic import BaseModel


class CreateUserInput(BaseModel):
    first_name: str
    last_name: str
    phone_number: Optional[str]


class UserInput(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    address: Optional[str]
    phone_number: Optional[str]
