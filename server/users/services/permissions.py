from auth.services import AuthUser


class UserPermission:
    def __init__(self, user: AuthUser):
        self.user = user

    def has_resolve_me_permission(self) -> bool:
        return True

    def has_register_permission(self) -> bool:
        return True

    def has_update_user_permission(self, id: str) -> bool:
        return id == self.user.id
