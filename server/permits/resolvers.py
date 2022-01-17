from typing import Any

from ariadne import MutationType, QueryType, ObjectType
from ariadne.types import GraphQLResolveInfo

from models import UserOrganization

query = QueryType()
mutation = MutationType()
organization_permit = ObjectType("OrganizationPermit")


@query.field("organizationPermitList")
async def resolve_organization_permit_list(
    _: Any, info: GraphQLResolveInfo
) -> list[UserOrganization]:
    pass


@mutation.field("createOrganizationPermit")
async def resolve_create_organization_permit(
    _: Any, info: GraphQLResolveInfo, input: dict[str, Any]
) -> dict[str, Any]:
    pass


@organization_permit.field("id")
async def resolve_organization_permit_id(
    obj: UserOrganization, info: GraphQLResolveInfo
) -> str:
    pass


@organization_permit.field("user")
async def resolve_organization_permit_user(
    obj: UserOrganization, info: GraphQLResolveInfo
) -> str:
    pass


@organization_permit.field("organization")
async def resolve_organization_permit_organization(
    obj: UserOrganization, info: GraphQLResolveInfo
) -> int:
    pass


@organization_permit.field("isOwner")
async def resolve_organization_permit_is_owner(
    obj: UserOrganization, info: GraphQLResolveInfo
) -> bool:
    pass


@organization_permit.field("isMember")
async def resolve_organization_permit_is_member(
    obj: UserOrganization, info: GraphQLResolveInfo
) -> bool:
    pass
