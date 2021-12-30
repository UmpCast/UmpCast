from auth.services import AuthUser


class UserPermission:
    def __init__(self, user: AuthUser):
        self.user = user

    def has_resolve_me_permission(self) -> bool:
        return True
