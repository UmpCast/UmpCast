from .base import *
from datetime import timedelta


GRAPHQL_JWT = {
    "JWT_VERIFY_EXPIRATION": True,
    "JWT_LONG_RUNNING_REFRESH_TOKEN": True,
    "JWT_EXPIRATION_DELTA": timedelta(seconds=20),
    "JWT_REFRESH_EXPIRATION_DELTA": timedelta(minutes=1),
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:19006",
]

TEST_RUNNER = "snapshottest.django.TestRunner"
