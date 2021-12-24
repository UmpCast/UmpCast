from users.graphql.types import user
from datetime import datetime


@user.field("id")
def resolve_id(obj, info) -> int:
    pass


@user.field("email")
def resolve_email(obj, info) -> int:
    pass


@user.field("date_created")
def resolve_date_created(obj, info) -> datetime:
    pass
