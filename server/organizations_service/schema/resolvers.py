from datetime import datetime
from optparse import Option
from typing import Any, Optional

from ariadne import QueryType, ScalarType
from ariadne.contrib.federation import FederatedObjectType
from ariadne.types import GraphQLResolveInfo

from organizations.models import Organization

query = QueryType()
organization = FederatedObjectType("Organization")
datetime_scalar = ScalarType("DateTime")


@datetime_scalar.serializer
def serialize_datetime(value: datetime) -> str:
    return value.isoformat()


@query.field("organization")
def resolve_organization(
    _: Any, __: GraphQLResolveInfo, id: int
) -> Optional[Organization]:
    if Organization.objects.filter(id=id).exists():
        return Organization.objects.get(id=id)
    else:
        return None


@organization.reference_resolver("id")
def resolve_user_reference(
    _: Any, __: GraphQLResolveInfo, representation: dict[str, Any]
) -> Organization:
    return Organization.objects.get(id=representation.get("id"))


@organization.field("dateCreated")
def resolve_date_created(obj: Organization, _: GraphQLResolveInfo) -> datetime:
    return obj.created_at


@organization.field("dateUpdated")
def resolve_date_updated(obj: Organization, _: GraphQLResolveInfo) -> datetime:
    return obj.updated_at


@organization.field("name")
def resolve_name(obj: Organization, _: GraphQLResolveInfo) -> str:
    return obj.name


@organization.field("description")
def resolve_description(obj: Organization, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.description


@organization.field("email")
def resolve_email(obj: Organization, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.email


@organization.field("logoUrl")
def resolve_logo_url(obj: Organization, _: GraphQLResolveInfo) -> Optional[str]:
    if obj.logo:
        return obj.logo.url
    else:
        return None


@organization.field("websiteUrl")
def resolve_website_url(obj: Organization, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.website_url
