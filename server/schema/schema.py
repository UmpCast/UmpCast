from .auth.mutation import Mutation as AuthMutation
import graphene


class Query(graphene.ObjectType):
    hello = graphene.String()

    def resolve_hello(self, info) -> str:
        return "Hello World"


class Mutation(AuthMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
