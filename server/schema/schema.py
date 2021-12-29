from ariadne import load_schema_from_path, make_executable_schema
from ariadne.contrib.django.scalars import date_scalar, datetime_scalar

from email_verification.graphql.resolvers import *
from schema.resolvers import *
from schema.types import input_error, mutation, query
from users.graphql.resolvers import *
from users.graphql.types import user

type_defs = load_schema_from_path(".")  # loads all .graphql files

schema = make_executable_schema(
    type_defs,
    query,
    mutation,
    input_error,
    user,
    [date_scalar, datetime_scalar],
)
