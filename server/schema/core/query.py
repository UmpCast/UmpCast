from .users.query import Query as UserQuery
import graphene


class Query(UserQuery, graphene.ObjectType):
    pass
