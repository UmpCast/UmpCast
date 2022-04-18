from dataclasses import dataclass
from datetime import datetime
from enum import Enum

from ariadne import EnumType, ObjectType, QueryType, ScalarType
from ariadne.contrib.federation import FederatedObjectType
from ariadne.types import GraphQLResolveInfo

from permits.models import UserOrganization


class OrganizationRoleType(Enum):
    OWNER = "owner"
    MEMBER = "member"


@dataclass
class UserJoinedOrganizationEdge:
    node: str
    membership: UserOrganization


query = QueryType()
user = FederatedObjectType("User")
organization = FederatedObjectType("Organization")
user_joined_organization_edge = ObjectType("UserJoinedOrganizationEdge")
organization_membership = ObjectType("OrganizationMembership")
datetime_scalar = ScalarType("DateTime")
organization_role_type = EnumType("OrganizationRoleType", OrganizationRoleType)


@query.field("hello")
def resolve_hello(_, __) -> str:
    return "Hello world!"


@datetime_scalar.serializer
def serialize_datetime(value: datetime) -> str:
    return value.isoformat()


@user.field("organizations")
def user_resolve_organizations(
    representation, _: GraphQLResolveInfo
) -> list[UserJoinedOrganizationEdge]:
    user_organizations = UserOrganization.objects.filter(
        user_id=representation.get("id")
    )
    return [
        UserJoinedOrganizationEdge(
            node=user_organization.organization_id,
            membership=user_organization,
        )
        for user_organization in user_organizations
    ]


@user_joined_organization_edge.field("node")
def resolve_user_joined_organization_edge_node(
    obj: UserJoinedOrganizationEdge, _: GraphQLResolveInfo
) -> dict[str, str]:
    return {
        "__typename": "Organization",
        "id": obj.node,
    }


@user_joined_organization_edge.field("membership")
def resolve_user_joined_organization_edge_membership(
    obj: UserJoinedOrganizationEdge, _: GraphQLResolveInfo
) -> UserOrganization:
    return obj.membership


@organization_membership.field("id")
def resolve_organization_membership_id(
    obj: UserOrganization, _: GraphQLResolveInfo
) -> int:
    return obj.id


@organization_membership.field("dateCreated")
def resolve_organization_membership_date_created(
    obj: UserOrganization, _: GraphQLResolveInfo
) -> datetime:
    return obj.created_at


@organization_membership.field("dateUpdated")
def resolve_organization_membership_date_updated(
    obj: UserOrganization, _: GraphQLResolveInfo
) -> datetime:
    return obj.updated_at


@organization_membership.field("role")
def resolve_organization_membership_role(
    obj: UserOrganization, _: GraphQLResolveInfo
) -> OrganizationRoleType:
    if obj.is_owner:
        return OrganizationRoleType.OWNER
    else:
        return OrganizationRoleType.MEMBER
