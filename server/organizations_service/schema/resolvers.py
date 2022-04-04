from datetime import datetime
from typing import Any, Optional

from ariadne import MutationType, QueryType, ScalarType, convert_kwargs_to_snake_case
from ariadne.contrib.federation import FederatedObjectType
from ariadne.types import GraphQLResolveInfo
from pydantic import ValidationError

from organizations.models import Organization, Season
from schema.inputs import (
    CreateOrganizationInput,
    CreateSeasonInput,
    UpdateOrganizationInput,
    UpdateSeasonInput,
)

query = QueryType()
mutation = MutationType()
organization = FederatedObjectType("Organization")
season = FederatedObjectType("Season")
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


@mutation.field("updateOrganization")
@convert_kwargs_to_snake_case
def resolve_update_organization(
    _: Any, __: GraphQLResolveInfo, input: dict[str, Any]
) -> dict[str, Any]:
    try:
        organization_input = UpdateOrganizationInput(**input)
        organization = Organization.objects.get(id=organization_input.organization_id)

        for k, v in organization_input.dict().items():
            setattr(organization, k, v)
        organization.save()

        return {
            "organization": organization,
            "errors": [],
        }
    except ValidationError as validation_error:
        return {
            "organization": None,
            "errors": get_input_errors(validation_error),
        }


@organization.reference_resolver("id")
def resolve_organization_reference(
    _: Any, __: GraphQLResolveInfo, representation: dict[str, Any]
) -> Organization:
    return Organization.objects.get(id=representation.get("id"))


@organization.field("dateCreated")
def resolve_organization_date_created(
    obj: Organization, _: GraphQLResolveInfo
) -> datetime:
    return obj.created_at


@organization.field("dateUpdated")
def resolve_organization_date_updated(
    obj: Organization, _: GraphQLResolveInfo
) -> datetime:
    return obj.updated_at


@organization.field("name")
def resolve_organization_name(obj: Organization, _: GraphQLResolveInfo) -> str:
    return obj.name


@organization.field("description")
def resolve_organization_description(
    obj: Organization, _: GraphQLResolveInfo
) -> Optional[str]:
    return obj.description


@organization.field("email")
def resolve_organization_email(
    obj: Organization, _: GraphQLResolveInfo
) -> Optional[str]:
    return obj.email


@organization.field("logoUrl")
def resolve_organization_logo_url(
    obj: Organization, _: GraphQLResolveInfo
) -> Optional[str]:
    if obj.logo:
        return obj.logo.url
    else:
        return None


@organization.field("websiteUrl")
def resolve_organization_website_url(
    obj: Organization, _: GraphQLResolveInfo
) -> Optional[str]:
    return obj.website_url


@organization.field("seasons")
def resolve_organization_seasons(
    obj: Organization, _: GraphQLResolveInfo
) -> list[Season]:
    return Season.objects.filter(organization_id=obj.id)


@season.reference_resolver("id")
def resolve_season_reference(
    _: Any, __: GraphQLResolveInfo, representation: dict[str, Any]
) -> Season:
    return Season.objects.get(id=representation.get("id"))


@query.field("season")
def resolve_season(_: Any, __: GraphQLResolveInfo, id: int) -> Optional[Season]:
    if Season.objects.filter(id=id).exists():
        return Season.objects.get(id=id)
    else:
        return None


@mutation.field("createSeason")
@convert_kwargs_to_snake_case
def resolve_create_season(
    _: Any, __: GraphQLResolveInfo, input: dict[str, Any]
) -> dict[str, Any]:
    try:
        return {
            "season": Season.objects.create(**CreateSeasonInput(**input).dict()),
            "errors": [],
        }
    except ValidationError as validation_error:
        return {
            "season": None,
            "errors": get_input_errors(validation_error),
        }


@mutation.field("updateSeason")
@convert_kwargs_to_snake_case
def resolve_update_season(
    _: Any, __: GraphQLResolveInfo, input: dict[str, Any]
) -> dict[str, Any]:
    try:
        season_input = UpdateSeasonInput(**input)
        season = Season.objects.get(id=season_input.season_id)

        for k, v in season_input.dict().items():
            setattr(season, k, v)
        season.save()

        return {
            "season": season,
            "errors": [],
        }
    except ValidationError as validation_error:
        return {
            "season": None,
            "errors": get_input_errors(validation_error),
        }


@season.field("dateCreated")
def resolve_season_date_created(obj: Season, _: GraphQLResolveInfo) -> datetime:
    return obj.created_at


@season.field("dateUpdated")
def resolve_season_date_updated(obj: Season, _: GraphQLResolveInfo) -> datetime:
    return obj.created_at


@season.field("organization")
def resolve_season_organization(obj: Season, _: GraphQLResolveInfo) -> Organization:
    return obj.organization


@season.field("name")
def resolve_season_organization(obj: Season, _: GraphQLResolveInfo) -> str:
    return obj.name


@season.field("endDate")
def resolve_season_organization(obj: Season, _: GraphQLResolveInfo) -> datetime:
    return obj.end_date
