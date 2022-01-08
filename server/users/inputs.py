from typing import Optional

from pydantic import BaseModel


class UserInput(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    address: Optional[str]
    phone_number: Optional[str]