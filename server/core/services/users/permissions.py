from core.models import User


class UserPermission(object):
    def __init__(self, user):
        self.user = user

    def has_resolve_organizations_permission(self, authenticated_user) -> bool:
        return self.is_user_owner(authenticated_user)

    def has_resolve_seasons_permission(self, authenticated_user) -> bool:
        return self.is_user_owner(authenticated_user)

    def is_user_owner(self, authenticated_user: User) -> bool:
        return self.user == authenticated_user
