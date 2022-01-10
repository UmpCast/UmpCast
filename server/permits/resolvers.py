from typing import Any

from ariadne import ObjectType, UnionType
from ariadne.types import GraphQLResolveInfo
from ariadne.contrib.federation import FederatedObjectType

from models import UserOrganization

user = FederatedObjectType("User")
organization = FederatedObjectType("Organization")
organization_permit = ObjectType("OrganizationPermit")
permit = UnionType("Permit")


@permit.type_resolver
async def resolve_permit_type(obj, *_):
    if isinstance(obj, UserOrganization):
        return "OrganizationPermit"
    else:
        return None


@user.field("permitList")
async def resolve_user_permit_list(
    obj, _: GraphQLResolveInfo
) -> list[UserOrganization]:
    return await UserOrganization.query.where(
        UserOrganization.user_id == obj["id"]
    ).gino.all()


@organization.field("permitList")
async def resolve_organization_permit_list(
    obj, _: GraphQLResolveInfo
) -> list[UserOrganization]:
    return await UserOrganization.query.where(
        UserOrganization.organization_id == obj["id"]
    ).gino.all()


@organization_permit.field("user")
async def resolve_organization_permit_user(
    obj: UserOrganization, _: GraphQLResolveInfo
) -> dict[str, Any]:
    return {
        "__typename": "User",
        "id": obj.user_id,
    }


@organization_permit.field("organization")
async def resolve_organization_permit_organization(
    obj: UserOrganization, _: GraphQLResolveInfo
) -> dict[str, Any]:
    return {
        "__typename": "Organization",
        "id": obj.organization_id,
    }


@organization_permit.field("isOwner")
async def resolve_organization_permit_is_owner(
    obj: UserOrganization, _: GraphQLResolveInfo
) -> bool:
    return obj.is_owner


@organization_permit.field("isMember")
async def resolve_organization_permit_is_member(
    obj: UserOrganization, _: GraphQLResolveInfo
) -> bool:
    return obj.is_member
