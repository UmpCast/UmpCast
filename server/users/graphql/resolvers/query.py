from schema.types import query


@query.field("me")
def resolve_me(*_):
    pass
