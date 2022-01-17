from typing import Any

from ariadne import MutationType, QueryType, ObjectType
from ariadne.types import GraphQLResolveInfo
from ariadne.utils import convert_kwargs_to_snake_case
from pydantic import ValidationError

from inputs import OrganizationPermitInput
from models import UserOrganization
from utils import get_input_errors

query = QueryType()
mutation = MutationType()
organization_permit = ObjectType("OrganizationPermit")


@query.field("organizationPermitList")
async def resolve_organization_permit_list(
    _: Any, info: GraphQLResolveInfo
) -> list[UserOrganization]:
    return await UserOrganization.query.gino.all()


@mutation.field("createOrganizationPermit")
@convert_kwargs_to_snake_case
async def resolve_create_organization_permit(
    _: Any,
    info: GraphQLResolveInfo,
    user: str,
    organization: int,
    input: dict[str, Any],
) -> dict[str, Any]:
    try:
        organization_permit_input = OrganizationPermitInput(**input)
    except ValidationError as validation_error:
        return {
            "organization_permit": None,
            "errors": get_input_errors(validation_error),
        }
    else:
        organization_permit = await UserOrganization.create(
            user_id=user,
            organization_id=organization,
            **organization_permit_input.dict()
        )
        return {
            "organization_permit": organization_permit,
            "errors": [],
        }


@organization_permit.field("id")
async def resolve_organization_permit_id(
    obj: UserOrganization, info: GraphQLResolveInfo
) -> str:
    return obj.id


@organization_permit.field("user")
async def resolve_organization_permit_user(
    obj: UserOrganization, info: GraphQLResolveInfo
) -> str:
    return obj.user_id


@organization_permit.field("organization")
async def resolve_organization_permit_organization(
    obj: UserOrganization, info: GraphQLResolveInfo
) -> int:
    return obj.organization_id


@organization_permit.field("isOwner")
async def resolve_organization_permit_is_owner(
    obj: UserOrganization, info: GraphQLResolveInfo
) -> bool:
    return obj.is_owner


@organization_permit.field("isMember")
async def resolve_organization_permit_is_member(
    obj: UserOrganization, info: GraphQLResolveInfo
) -> bool:
    return obj.is_member
