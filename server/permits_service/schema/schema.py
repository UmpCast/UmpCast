from ariadne import load_schema_from_path
from ariadne.contrib.federation import make_federated_schema

from schema.resolvers import (
    datetime_scalar,
    organization,
    organization_membership,
    organization_role_type,
    query,
    user,
    user_joined_organization_edge,
)

type_defs = load_schema_from_path("schema/schema.graphql")
schema = make_federated_schema(
    type_defs,
    [
        query,
        user,
        organization,
        user_joined_organization_edge,
        organization_membership,
        datetime_scalar,
        organization_role_type,
    ],
)
