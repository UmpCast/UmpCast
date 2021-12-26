from .base import *
from utils.secrets import get_secret

FIREBASE_CREDENTIALS = {
    "private_key_id": get_secret(
        AWS_SECRETS_CLIENT,
        "server/dev",
        "FIREBASE_PRIVATE_KEY_ID",
    ),
    "private_key": get_secret(
        AWS_SECRETS_CLIENT,
        "server/dev",
        "FIREBASE_PRIVATE_KEY",
    ),
    "client_email": get_secret(
        AWS_SECRETS_CLIENT,
        "server/dev",
        "FIREBASE_CLIENT_EMAIL",
    ),
    "client_x509_cert_url": get_secret(
        AWS_SECRETS_CLIENT,
        "server/dev",
        "FIREBASE_CLIENT_X509_CERT_URL",
    ),
}
