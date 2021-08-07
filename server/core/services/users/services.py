from core.models import User, Organization, Season


class UserService(object):
    def __init__(self, user):
        self.user = user

    def current_user(self) -> User:
        return self.user

    def owned_organizations(self) -> list[Organization]:
        return Organization.objects.filter(
            userorganization__user=self.user,
            userorganization__is_owner=True,
        )

    def admin_seasons(self) -> list[Season]:
        return Season.objects.filter(
            userseason__user=self.user,
            userseason__permission_type="admin",
        )

    def referee_seasons(self) -> list[Season]:
        return Season.objects.filter(
            userseason__user=self.user,
            userseason__permission_type="referee",
        )
