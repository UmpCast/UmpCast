from graphene_django import DjangoObjectType
from core.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        only_fields = (
            "id",
            "last_login",
            "email",
            "first_name",
            "last_name",
            "date_created",
        )
