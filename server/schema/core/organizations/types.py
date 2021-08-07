from graphene_django import DjangoObjectType
from core.models import Organization


class OrganizationType(DjangoObjectType):
    class Meta:
        model = Organization
        fields = (
            "id",
            "name",
            "email",
            "website_url",
            "date_created",
        )
