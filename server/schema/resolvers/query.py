from schema.types import query
from typing import Any


@query.field("ping")
def resolve_ping(*_: Any) -> str:
    return "pong"
