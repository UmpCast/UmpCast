from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class User:
    id: str
    email: str
    date_created: datetime
