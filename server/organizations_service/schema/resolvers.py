from datetime import datetime
from typing import Any, Optional

from ariadne import MutationType, QueryType, ScalarType, convert_kwargs_to_snake_case
from ariadne.contrib.federation import FederatedObjectType
from ariadne.types import GraphQLResolveInfo
from pydantic import ValidationError

from organizations.models import Organization
from schema.inputs import CreateOrganizationInput

query = QueryType()
mutation = MutationType()
organization = FederatedObjectType("Organization")
datetime_scalar = ScalarType("DateTime")


@datetime_scalar.serializer
def serialize_datetime(value: datetime) -> str:
    return value.isoformat()


def get_input_errors(error: ValidationError) -> list[dict[str, str]]:
    return [
        {
            "key": e["loc"][0],
            "message": e["msg"],
        }
        for e in error.errors()
    ]


@query.field("organization")
def resolve_organization(
    _: Any, __: GraphQLResolveInfo, id: int
) -> Optional[Organization]:
    if Organization.objects.filter(id=id).exists():
        return Organization.objects.get(id=id)
    else:
        return None


@mutation.field("createOrganization")
@convert_kwargs_to_snake_case
def resolve_create_organization(
    _: Any, __: GraphQLResolveInfo, input: dict[str, Any]
) -> dict[str, Any]:
    try:
        return {
            "organization": Organization.objects.create(
                **CreateOrganizationInput(**input).dict()
            ),
            "errors": [],
        }
    except ValidationError as validation_error:
        return {
            "organization": None,
            "errors": get_input_errors(validation_error),
        }


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
