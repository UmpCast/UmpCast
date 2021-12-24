from ariadne import make_executable_schema, load_schema_from_path
from schema.types import query, datetime_scalar
from schema.resolvers import *
from users.graphql.types import user
from users.graphql.resolvers import *

query_type_defs = load_schema_from_path("schema/schema.graphql")
user_type_defs = load_schema_from_path("users/graphql/schema.graphql")

schema = make_executable_schema(
    [query_type_defs, user_type_defs],
    query,
    datetime_scalar,
    user,
)
