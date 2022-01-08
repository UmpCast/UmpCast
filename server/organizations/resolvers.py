from typing import Any, Optional

from ariadne import QueryType
from ariadne.contrib.federation import FederatedObjectType
from ariadne.types import GraphQLResolveInfo, GraphQLError

from models import Organization

query = QueryType()
organization = FederatedObjectType("Organization")


@query.field("organizationList")
async def resolve_organization_list(
    _: Any, info: GraphQLResolveInfo
) -> list[Organization]:
    return await Organization.query.gino.all()


@organization.reference_resolver("id")
async def resolve_organization_reference(
    _: Any, info: GraphQLResolveInfo, representation: dict[str, Any]
) -> Organization:
    organization: Optional[Organization] = await Organization.get(
        representation.get("id", "")
    )

    if organization is not None:
        return organization
    else:
        raise GraphQLError("Organization not found")


@organization.field("name")
async def resolve_name(obj: Organization, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.name


@organization.field("email")
async def resolve_email(obj: Organization, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.email


@organization.field("websiteUrl")
async def resolve_website_url(
    obj: Organization, _: GraphQLResolveInfo
) -> Optional[str]:
    return obj.website_url
