from core.models import User


class UserService(object):
    def __init__(self, user):
        self.user = user

    def current_user(self) -> User:
        return self.user
