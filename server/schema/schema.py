from ariadne import make_executable_schema, load_schema_from_path
from schema.types import query, datetime_scalar
from schema.resolvers import *
from users.graphql.types import user
from users.graphql.resolvers import *

type_defs = load_schema_from_path(".")  # loads all .graphql files

schema = make_executable_schema(
    type_defs,
    query,
    datetime_scalar,
    user,
)
