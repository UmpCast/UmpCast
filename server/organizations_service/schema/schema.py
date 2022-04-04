from ariadne import load_schema_from_path
from ariadne.contrib.federation import make_federated_schema

from schema.resolvers import datetime_scalar, mutation, organization, query, season

type_defs = load_schema_from_path("schema/schema.graphql")
schema = make_federated_schema(
    type_defs, [query, mutation, organization, season, datetime_scalar]
)
