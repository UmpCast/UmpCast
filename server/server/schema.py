import graphene
import graphql_jwt
from schema.core.query import Query as CoreQuery
from schema.core.mutation import Mutation as CoreMutation


class Query(CoreQuery, graphene.ObjectType):
    pass


class Mutation(CoreMutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
