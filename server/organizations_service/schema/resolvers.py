from ariadne import QueryType

query = QueryType()


@query.field("hello")
def resolve_hello(_, __) -> str:
    return "Hello world!"
