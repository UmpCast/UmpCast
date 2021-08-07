from graphene_django import DjangoObjectType
from core.models import User
from core.services import UserService
import graphene


class UserType(DjangoObjectType):

    owned_organizations = graphene.List("schema.core.types.OrganizationType")
    admin_seasons = graphene.List("schema.core.types.SeasonType")
    referee_seasons = graphene.List("schema.core.types.SeasonType")

    class Meta:
        model = User
        fields = (
            "id",
            "last_login",
            "email",
            "first_name",
            "last_name",
            "date_created",
        )

    @staticmethod
    def resolve_owned_organizations(root: User, info):
        user_service = UserService(root)
        return user_service.owned_organizations()

    @staticmethod
    def resolve_admin_seasons(root: User, info):
        user_service = UserService(root)
        return user_service.admin_seasons()

    @staticmethod
    def resolve_referee_seasons(root: User, info):
        user_service = UserService(root)
        return user_service.referee_seasons()
