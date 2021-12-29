from typing import Any

from schema.types import query


@query.field("ping")
def resolve_ping(*_: Any) -> str:
    return "pong"
