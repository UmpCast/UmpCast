from graphene_django import DjangoObjectType
from .types import UserSeasonType, UserOrganizationType
import graphene
from core.models import User
from graphql_jwt.decorators import login_required
from core.services import UserService, UserPermission
from graphql import GraphQLError


class UserType(DjangoObjectType):

    organizations = graphene.List(
        "schema.core.types.OrganizationType",
        user_organization_type=UserOrganizationType(required=True),
    )

    seasons = graphene.List(
        "schema.core.types.SeasonType",
        user_season_type=UserSeasonType(required=True),
    )

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
    @login_required
    def resolve_organizations(
        root: User, info, user_organization_type: UserOrganizationType
    ):
        if not UserPermission(root).has_resolve_organizations_permission(
            info.context.user
        ):
            raise GraphQLError("Permission Denied")
        user_service = UserService(root)
        if user_organization_type == UserOrganizationType.OWNER:
            return user_service.owned_organizations()
        elif user_organization_type == UserOrganizationType.MEMBER:
            return user_service.member_organizations()
        elif user_organization_type == UserOrganizationType.ALL:
            return user_service.all_organizations()
        else:
            raise GraphQLError("Invalid UserOrganizationType")

    @staticmethod
    @login_required
    def resolve_seasons(root: User, info, user_season_type: UserSeasonType):
        if not UserPermission(root).has_resolve_seasons_permission(info.context.user):
            raise GraphQLError("Permission Denied")
        user_service = UserService(root)
        if user_season_type == UserSeasonType.ADMIN:
            return user_service.admin_seasons()
        elif user_season_type == UserSeasonType.REFEREE:
            return user_service.referee_seasons()
        elif user_season_type == UserSeasonType.ALL:
            return user_service.all_seasons()
        else:
            raise GraphQLError("Invalid UserSeasonType")
