from users.graphql.types import user
from datetime import datetime
from users.services import User
from ariadne.types import GraphQLResolveInfo


@user.field("id")
def resolve_id(obj: User, info: GraphQLResolveInfo) -> str:
    return obj.id


@user.field("email")
def resolve_email(obj: User, info: GraphQLResolveInfo) -> str:
    return obj.email


@user.field("date_created")
def resolve_date_created(obj: User, info: GraphQLResolveInfo) -> datetime:
    return obj.date_created
