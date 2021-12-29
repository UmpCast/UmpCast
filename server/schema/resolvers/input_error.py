from ariadne.types import GraphQLResolveInfo

from schema.services import InputError
from schema.types import input_error


@input_error.field("key")
def resolve_key(obj: InputError, info: GraphQLResolveInfo) -> str:
    return obj.key


@input_error.field("message")
def resolve_message(obj: InputError, info: GraphQLResolveInfo) -> str:
    return obj.message
