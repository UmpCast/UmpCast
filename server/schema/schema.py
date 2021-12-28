from ariadne import make_executable_schema, load_schema_from_path
from ariadne.contrib.django.scalars import date_scalar, datetime_scalar

from schema.types import query, mutation, input_error
from schema.resolvers import *

from users.graphql.types import user
from users.graphql.resolvers import *

type_defs = load_schema_from_path(".")  # loads all .graphql files

schema = make_executable_schema(
    type_defs,
    query,
    mutation,
    input_error,
    user,
    [date_scalar, datetime_scalar],
)
