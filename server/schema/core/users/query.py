import graphene
from .types import UserType
from core.services import UserService
from graphql_jwt.decorators import login_required


class Query(graphene.ObjectType):
    me = graphene.Field(UserType)

    @staticmethod
    @login_required
    def resolve_me(parent, info):
        user_service = UserService(info.context.user)
        return user_service.current_user()
