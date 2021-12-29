from datetime import datetime

from ariadne.types import GraphQLResolveInfo

from users.graphql.types import user
from users.services import User


@user.field("id")
def resolve_id(obj: User, info: GraphQLResolveInfo) -> str:
    return obj.id


@user.field("email")
def resolve_email(obj: User, info: GraphQLResolveInfo) -> str:
    return obj.email


@user.field("date_created")
def resolve_date_created(obj: User, info: GraphQLResolveInfo) -> datetime:
    return obj.date_created


@user.field("first_name")
def resolve_first_name(obj: User, info: GraphQLResolveInfo) -> str:
    return obj.first_name


@user.field("last_name")
def resolve_last_name(obj: User, info: GraphQLResolveInfo) -> str:
    return obj.last_name


@user.field("street_address")
def resolve_street_address(obj: User, info: GraphQLResolveInfo) -> str:
    return obj.street_address


@user.field("city")
def resolve_city(obj: User, info: GraphQLResolveInfo) -> str:
    return obj.city


@user.field("state")
def resolve_state(obj: User, info: GraphQLResolveInfo) -> str:
    return obj.state


@user.field("zip_code")
def resolve_zip_code(obj: User, info: GraphQLResolveInfo) -> int:
    return obj.zip_code


@user.field("phone_number")
def resolve_phone_number(obj: User, info: GraphQLResolveInfo) -> str:
    return obj.phone_number


@user.field("full_address")
def resolve_full_address(obj: User, info: GraphQLResolveInfo) -> str:
    return f"{obj.street_address}, {obj.city}, {obj.state} {obj.zip_code}"
