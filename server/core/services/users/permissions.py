from core.models import User


class UserPermission(object):
    def __init__(self, user: User):
        self.user = user

    def has_resolve_organizations_permission(self, authenticated_user: User) -> bool:
        return self.is_user_owner(authenticated_user)

    def has_resolve_seasons_permission(self, authenticated_user: User) -> bool:
        return self.is_user_owner(authenticated_user)

    def is_user_owner(self, authenticated_user: User) -> bool:
        return self.user == authenticated_user

    @staticmethod
    def has_create_permission(authenticated_user: User) -> bool:
        return True

    @staticmethod
    def has_update_permission(user_id: int, authenticated_user: User) -> bool:
        return user_id == authenticated_user.id
