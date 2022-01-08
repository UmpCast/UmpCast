from typing import Any, Optional

from ariadne import MutationType, QueryType
from ariadne.contrib.federation import FederatedObjectType
from ariadne.types import GraphQLError, GraphQLResolveInfo
from ariadne.utils import convert_kwargs_to_snake_case
from pydantic import ValidationError

from inputs import UserInput
from models import User
from utils import get_input_errors

query = QueryType()
mutation = MutationType()
user = FederatedObjectType("User")


@query.field("me")
async def resolve_me(_: Any, info: GraphQLResolveInfo) -> Optional[User]:
    id: Optional[str] = info.context.get("user-id")

    if id is None:
        raise GraphQLError("Permission Denied")

    user: Optional[User] = await User.get(id)
    return user


@mutation.field("createUser")
@convert_kwargs_to_snake_case
async def resolve_create_user(
    _: Any, info: GraphQLResolveInfo, input: dict[str, Any]
) -> dict[str, Any]:
    id: Optional[str] = info.context.get("user-id")

    if id is None:
        raise GraphQLError("Permission Denied")

    try:
        user_input = UserInput(**input)
    except ValidationError as validation_error:
        return {
            "user": None,
            "errors": get_input_errors(validation_error),
        }
    else:
        user = await User.create(id=id, **user_input.dict())
        return {
            "user": user,
            "errors": [],
        }


@mutation.field("updateUser")
@convert_kwargs_to_snake_case
async def resolve_update_user(
    _: Any, info: GraphQLResolveInfo, id: str, input: dict[str, Any]
) -> dict[str, Any]:
    user_id: Optional[str] = info.context.get("user-id")

    if user_id is None or user_id != id:
        raise GraphQLError("Permission Denied")

    user: Optional[User] = await User.get(id)

    if user is None:
        raise GraphQLError("User not found")

    try:
        user_input = UserInput(**input)
    except ValidationError as validation_error:
        return {
            "user": None,
            "errors": get_input_errors(validation_error),
        }
    else:
        await user.update(**user_input.dict(exclude_none=True)).apply()
        return {
            "user": user,
            "errors": [],
        }


@user.reference_resolver("id")
async def resolve_user_reference(
    _: Any, info: GraphQLResolveInfo, representation: dict[str, Any]
) -> User:
    user: Optional[User] = await User.get(representation.get("id", ""))

    if user is not None:
        return user
    else:
        raise GraphQLError("User not found")


@user.field("firstName")
async def resolve_first_name(obj: User, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.first_name


@user.field("lastName")
async def resolve_last_name(obj: User, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.last_name


@user.field("email")
async def resolve_email(obj: User, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.email


@user.field("address")
async def resolve_address(obj: User, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.address


@user.field("phoneNumber")
async def resolve_phone_number(obj: User, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.phone_number
