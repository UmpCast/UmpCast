from schema.types import query


@query.field("ping")
def resolve_ping(*_) -> str:
    return "pong"
