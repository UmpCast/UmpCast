from schema.types import query


@query.field("hello_world")
def resolve_hello_world(*_) -> str:
    return "Hello World!"
