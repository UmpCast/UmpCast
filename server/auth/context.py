import firebase_admin
from firebase_admin import auth, credentials
from auth.services import AuthService, AuthUser
from django.conf import settings

firebase_admin.initialize_app(
    credential=credentials.Certificate(
        {
            "type": "service_account",
            "project_id": "umpcast-prod",
            "private_key_id": settings.FIREBASE_CREDENTIALS["private_key_id"],
            "private_key": settings.FIREBASE_CREDENTIALS["private_key"],
            "client_email": settings.FIREBASE_CREDENTIALS["client_email"],
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": settings.FIREBASE_CREDENTIALS[
                "client_x509_cert_url"
            ],
        }
    )
)


def get_jwt_token(request) -> str:
    auth = request.headers.get("Authorization", "").split()
    if len(auth) == 2 and auth[0].lower() == "jwt":
        return auth[1]
    else:
        return ""


def get_context_value(request):
    token = get_jwt_token(request)

    user: AuthUser = AuthService.get_anonymous_user()

    if token != "":
        try:
            response = auth.verify_id_token(token)
            user: AuthUser = AuthService.get_firebase_user(
                id=response["uid"],
                email=response["email"],
                email_verified=response["email_verified"],
            )
        except:
            pass

    return {
        "request": request,
        "auth_user": user,
    }
