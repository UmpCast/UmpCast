from ariadne import QueryType, ScalarType

query = QueryType()

datetime_scalar = ScalarType(
    "DateTime", serializer=lambda date_time: date_time.isoformat()
)
