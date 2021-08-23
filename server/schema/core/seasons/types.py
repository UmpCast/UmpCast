from graphene_django import DjangoObjectType
from core.models import Season
from schema.core.users.types import UserType


class SeasonType(DjangoObjectType):
    class Meta:
        model = Season
        fields = (
            "id",
            "name",
            "start_date",
            "end_date",
            "date_created",
        )