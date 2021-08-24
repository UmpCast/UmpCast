from graphene_django import DjangoObjectType
from core.models import User
from core.services import UserService, UserPermission
import graphene
from graphql import GraphQLError
from graphql_jwt.decorators import login_required
from graphene_django.rest_framework import mutation
from core.serializers import UserSerializer


class UserOrganizationType(graphene.Enum):

    MEMBER = "member"
    OWNER = "owner"
    ALL = "all"


class UserSeasonType(graphene.Enum):

    ADMIN = "admin"
    REFEREE = "referee"
    ALL = "all"


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


class UserCreateMutationType(mutation.SerializerMutation):
    class Meta:
        serializer_class = UserSerializer
        model_operations = ["create"]

    @classmethod
    def mutate(cls, root, info, input):
        if not UserPermission.has_create_permission(info.context.user):
            raise GraphQLError("Permission Denied")
        return super().mutate(root, info, input)


class UserUpdateMutationType(mutation.SerializerMutation):
    class Meta:
        serializer_class = UserSerializer
        model_operations = ["update"]

    @classmethod
    @login_required
    def mutate(cls, root, info, input):
        id = input.get("id")
        if not UserPermission.has_update_permission(id, info.context.user):
            raise GraphQLError("Permission Denied")
        return super().mutate(root, info, input)
