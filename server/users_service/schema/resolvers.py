from typing import Any, Optional

from ariadne import MutationType, QueryType
from ariadne.contrib.federation import FederatedObjectType
from ariadne.types import GraphQLError, GraphQLResolveInfo
from ariadne.utils import convert_kwargs_to_snake_case
from pydantic import ValidationError

from schema.inputs import UserInput
from users.models import User

query = QueryType()
mutation = MutationType()
user = FederatedObjectType("User")


def get_input_errors(error: ValidationError) -> list[dict[str, str]]:
    return [
        {
            "key": e["loc"][0],
            "message": e["msg"],
        }
        for e in error.errors()
    ]


@query.field("viewer")
def resolve_viewer(_: Any, info: GraphQLResolveInfo) -> Optional[User]:
    try:
        return User.objects.get(id=info.context.get("user_id"))
    except:
        return None


@mutation.field("createUser")
@convert_kwargs_to_snake_case
def resolve_create_user(
    _: Any, info: GraphQLResolveInfo, input: dict[str, Any]
) -> dict[str, Any]:
    try:
        return {
            "user": User.objects.create(
                id=info.context.get(
                    "user_id",
                ),
                **UserInput(**input).dict(),
            ),
            "errors": [],
        }
    except ValidationError as validation_error:
        return {
            "user": None,
            "errors": get_input_errors(validation_error),
        }


@mutation.field("updateUser")
@convert_kwargs_to_snake_case
def resolve_update_user(
    _: Any, info: GraphQLResolveInfo, id: str, input: dict[str, Any]
) -> dict[str, Any]:
    if info.context.get("user-id") != id:
        raise GraphQLError("Permission Denied")
    try:
        return {
            "user": User.objects.filter(id=id).update(**UserInput(**input).dict()),
            "errors": [],
        }
    except ValidationError as validation_error:
        return {
            "user": None,
            "errors": get_input_errors(validation_error),
        }


@user.reference_resolver("id")
def resolve_user_reference(
    _: Any, __: GraphQLResolveInfo, representation: dict[str, Any]
) -> User:
    return User.objects.get(id=representation.get("id"))


@user.field("firstName")
def resolve_first_name(obj: User, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.first_name


@user.field("lastName")
def resolve_last_name(obj: User, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.last_name


@user.field("email")
def resolve_email(obj: User, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.email


@user.field("address")
def resolve_address(obj: User, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.address


@user.field("phoneNumber")
def resolve_phone_number(obj: User, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.phone_number
