import graphene
from .types import UserCreateMutation, UserUpdateMutation


class Mutation(graphene.ObjectType):
    create_user = UserCreateMutation.Field()
    update_user = UserUpdateMutation.Field()
