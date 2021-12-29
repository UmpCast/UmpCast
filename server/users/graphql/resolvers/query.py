from typing import Any, Union

from ariadne.types import GraphQLResolveInfo

from auth.services import AuthUser
from schema.types import query
from users.services import User, UserPermission, UserService
from utils.exceptions import AuthenticationError, AuthorizationError, ServerError


@query.field("me")
def resolve_me(_: Any, info: GraphQLResolveInfo) -> User:
    auth_user: Union[AuthUser, None] = info.context.get("auth_user", None)

    if auth_user is None:
        raise ServerError()

    if not UserPermission(auth_user).has_resolve_me_permission():
        raise AuthorizationError()

    user: Union[User, None] = UserService.get_user_from_auth_user(auth_user)

    if user is not None:
        return user
    else:
        raise AuthenticationError()
