import uuid
from typing import Optional

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils.timezone import now


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(
        self, email: str, password: str, id: Optional[str] = None
    ) -> "User":
        user: "User" = self.create(
            id=id,
            email=email,
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(
        self, email: str, password: str, id: Optional[str] = None
    ) -> "User":
        user = self.create_user(email, password, id)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


def generate_uuid() -> str:
    return uuid.uuid4().hex


class User(AbstractBaseUser, PermissionsMixin):
    id = models.CharField(
        primary_key=True,
        max_length=128,  # 128 is the max length of firebase id
        default=generate_uuid,  # generate a random uuid by default
    )
    email = models.EmailField(
        unique=True,
    )

    date_created = models.DateTimeField(default=now, editable=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS: list[str] = []

    def __str__(self) -> str:
        return self.email
