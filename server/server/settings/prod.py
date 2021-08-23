from .base import *
from datetime import timedelta

GRAPHQL_JWT = {
    "JWT_VERIFY_EXPIRATION": True,
    "JWT_LONG_RUNNING_REFRESH_TOKEN": True,
    "JWT_EXPIRATION_DELTA": timedelta(minutes=15),
    "JWT_REFRESH_EXPIRATION_DELTA": timedelta(days=15),
}
