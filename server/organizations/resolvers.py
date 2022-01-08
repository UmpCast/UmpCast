from typing import Any, Optional
from datetime import datetime

from ariadne import QueryType, ScalarType
from ariadne.contrib.federation import FederatedObjectType
from ariadne.types import GraphQLResolveInfo, GraphQLError

from models import Organization, Season, Division, Position

query = QueryType()
organization = FederatedObjectType("Organization")
season = FederatedObjectType("Season")
division = FederatedObjectType("Division")
position = FederatedObjectType("Position")
datetime_scalar = ScalarType("DateTime", serializer=lambda dt: dt.isoformat())


@query.field("organizationList")
async def resolve_organization_list(
    _: Any, info: GraphQLResolveInfo
) -> list[Organization]:
    return await Organization.query.gino.all()


@query.field("seasonList")
async def resolve_season_list(_: Any, info: GraphQLResolveInfo) -> list[Season]:
    return await Season.query.gino.all()


@query.field("divisionList")
async def resolve_division_list(_: Any, info: GraphQLResolveInfo) -> list[Division]:
    return await Division.query.gino.all()


@query.field("positionList")
async def resolve_position_list(_: Any, info: GraphQLResolveInfo) -> list[Position]:
    return await Position.query.gino.all()


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
async def resolve_organization_name(
    obj: Organization, _: GraphQLResolveInfo
) -> Optional[str]:
    return obj.name


@organization.field("email")
async def resolve_organization_email(
    obj: Organization, _: GraphQLResolveInfo
) -> Optional[str]:
    return obj.email


@organization.field("websiteUrl")
async def resolve_organization_website_url(
    obj: Organization, _: GraphQLResolveInfo
) -> Optional[str]:
    return obj.website_url


@season.reference_resolver("id")
async def resolve_season_reference(
    _: Any, info: GraphQLResolveInfo, representation: dict[str, Any]
) -> Season:
    season: Optional[Season] = await Season.get(representation.get("id", ""))

    if season is not None:
        return season
    else:
        raise GraphQLError("Season not found")


@season.field("organization")
async def resolve_season_organization(
    obj: Season, _: GraphQLResolveInfo
) -> Organization:
    organization: Optional[Organization] = await Organization.get(obj.organization_id)

    if organization is not None:
        return organization
    else:
        raise GraphQLError("Organization not found")


@season.field("name")
async def resolve_season_name(obj: Season, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.name


@season.field("startDate")
async def resolve_season_start_date(obj: Season, _: GraphQLResolveInfo) -> datetime:
    return obj.start_date


@season.field("endDate")
async def resolve_season_end_date(obj: Season, _: GraphQLResolveInfo) -> datetime:
    return obj.end_date


@division.reference_resolver("id")
async def resolve_division_reference(
    _: Any, info: GraphQLResolveInfo, representation: dict[str, Any]
) -> Division:
    division: Optional[Division] = await Division.get(representation.get("id", ""))

    if division is not None:
        return division
    else:
        raise GraphQLError("Division not found")


@division.field("season")
async def resolve_division_season(obj: Division, _: GraphQLResolveInfo) -> Season:
    season: Optional[Season] = await Season.get(obj.season_id)

    if season is not None:
        return season
    else:
        raise GraphQLError("Season not found")


@division.field("name")
async def resolve_division_name(obj: Division, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.name


@position.reference_resolver("id")
async def resolve_position_reference(
    _: Any, info: GraphQLResolveInfo, representation: dict[str, Any]
) -> Position:
    position: Optional[Position] = await Position.get(representation.get("id", ""))

    if position is not None:
        return position
    else:
        raise GraphQLError("Position not found")


@position.field("division")
async def resolve_position_division(obj: Position, _: GraphQLResolveInfo) -> Division:
    division: Optional[Division] = await Division.get(obj.division_id)

    if division is not None:
        return division
    else:
        raise GraphQLError("Division not found")


@position.field("name")
async def resolve_position_name(obj: Position, _: GraphQLResolveInfo) -> Optional[str]:
    return obj.name
