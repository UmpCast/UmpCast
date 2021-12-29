from typing import Optional, Union

from auth.services import AuthUser
from users.models import User as UserModel
from users.models import UserProfile as UserProfileModel

from .user import User


class UserService:
    @classmethod
    def get_user_from_models(
        cls,
        user_model: UserModel,
        user_profile_model: Optional[UserProfileModel],
    ) -> User:
        if user_profile_model is None:
            return User(
                id=user_model.id,
                email=user_model.email,
                date_created=user_model.date_created,
                first_name="UmpireCast",
                last_name="User",
                street_address="100 UmpireCast Way",
                city="Palo Alto",
                state="California",
                zip_code=94303,
                phone_number="650123123",
            )
        else:
            return User(
                id=user_model.id,
                email=user_model.email,
                date_created=user_model.date_created,
                first_name=user_profile_model.first_name,
                last_name=user_profile_model.last_name,
                street_address=user_profile_model.street_address,
                city=user_profile_model.city,
                state=user_profile_model.state,
                zip_code=user_profile_model.zip_code,
                phone_number=user_profile_model.phone_number,
            )

    @classmethod
    def get_user_from_auth_user(cls, auth_user: AuthUser) -> Union[User, None]:
        if UserModel.objects.filter(id=auth_user.id).exists():
            user_model: UserModel = UserModel.objects.get(id=auth_user.id)
            user_profile_model: Optional[UserProfileModel] = None
            if UserProfileModel.objects.filter(user=user_model).exists():
                user_profile_model = UserProfileModel.objects.get(user=user_model)
            return cls.get_user_from_models(user_model, user_profile_model)
        else:
            return None
