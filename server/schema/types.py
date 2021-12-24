from ariadne import QueryType, ScalarType

query = QueryType()

datetime_scalar = ScalarType("DateTime", serializer=lambda x: x.isoformat())
