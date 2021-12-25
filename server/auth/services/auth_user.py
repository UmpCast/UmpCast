from dataclasses import dataclass


@dataclass(frozen=True)
class AuthUser:
    id: str
    email: str
    email_verified: bool


@dataclass(frozen=True)
class FireBaseUser(AuthUser):
    pass


@dataclass(frozen=True)
class AnonymousUser(AuthUser):
    id: str = ""
    email: str = ""
    email_verified: bool = False
