import graphene
from .types import UserType
from core.services import UserService


class Query(graphene.ObjectType):
    me = graphene.Field(UserType)

    @staticmethod
    def resolve_me(parent, info):
        user_service = UserService(info.context.user)
        return user_service.current_user()
