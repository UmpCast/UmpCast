from utils.secrets import get_secret

from .base import *

FIREBASE_CREDENTIALS = {
    "private_key_id": get_secret(
        AWS_SECRETS_CLIENT,
        "server/prod",
        "FIREBASE_PRIVATE_KEY_ID",
    ),
    "private_key": get_secret(
        AWS_SECRETS_CLIENT,
        "server/prod",
        "FIREBASE_PRIVATE_KEY",
    ),
    "client_email": get_secret(
        AWS_SECRETS_CLIENT,
        "server/prod",
        "FIREBASE_CLIENT_EMAIL",
    ),
    "client_x509_cert_url": get_secret(
        AWS_SECRETS_CLIENT,
        "server/prod",
        "FIREBASE_CLIENT_X509_CERT_URL",
    ),
}

EMAIL_HOST = "smtp.sendgrid.net"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "apikey"
EMAIL_HOST_PASSWORD = get_secret(
    AWS_SECRETS_CLIENT,
    "server/prod",
    "SENDGRID_API_KEY",
)
