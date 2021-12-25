from .user import User
from auth.services import AuthUser
from users.models import User as UserModel
from typing import Union


class UserService:
    @classmethod
    def get_user_from_user_model(cls, user_model: UserModel) -> User:
        return User(
            id=user_model.id,
            email=user_model.email,
            date_created=user_model.date_created,
        )

    @classmethod
    def get_user_from_auth_user(cls, auth_user: AuthUser) -> Union[User, None]:
        if UserModel.objects.filter(id=auth_user.id).exists():
            user_model: UserModel = UserModel.objects.get(id=auth_user.id)
            return cls.get_user_from_user_model(user_model)
        else:
            return None
