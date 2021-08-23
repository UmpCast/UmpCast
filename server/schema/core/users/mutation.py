import graphene
from .types import UserCreateMutationType, UserUpdateMutationType


class Mutation(graphene.ObjectType):
    create_user = UserCreateMutationType.Field()
    update_user = UserUpdateMutationType.Field()
