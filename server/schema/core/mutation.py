from .users.mutation import Mutation as UserMutation
import graphene


class Mutation(UserMutation, graphene.ObjectType):
    pass
