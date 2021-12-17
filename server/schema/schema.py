from ariadne import make_executable_schema, load_schema_from_path
from schema.types import query
from schema.resolvers import *

query_type_defs = load_schema_from_path("schema/schema.graphql")

schema = make_executable_schema([query_type_defs], query)
