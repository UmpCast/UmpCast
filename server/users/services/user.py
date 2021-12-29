from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class User:
    # from User
    id: str
    email: str
    date_created: datetime
    # from UserProfile
    first_name: str
    last_name: str
    street_address: str
    city: str
    state: str
    zip_code: int
    phone_number: str
