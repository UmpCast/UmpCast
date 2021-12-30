from auth.services import AnonymousUser, AuthUser, FireBaseUser


class AuthService:
    @classmethod
    def get_firebase_user(cls, id: str, email: str, email_verified: bool) -> AuthUser:
        return FireBaseUser(
            id=id,
            email=email,
            email_verified=email_verified,
        )

    @classmethod
    def get_anonymous_user(cls) -> AuthUser:
        return AnonymousUser()
