from django.test import TestCase
from users.models import UserProfile, User
from model_bakery import baker


class UserProfileTest(TestCase):
    def test_create_user_profile(self) -> None:
        user = baker.make(User)
        user_profile = UserProfile.objects.create(
            user=user,
            first_name="Benjamin",
            last_name="Franklin",
            street_address="Walnut Street",
            city="Philadelphia",
            state="Pennsylvania",
            zip_code=19104,
            phone_number="2158986636",
        )
        self.assertEqual(user_profile.user, user)
        self.assertEqual(user_profile.first_name, "Benjamin")
        self.assertEqual(user_profile.last_name, "Franklin")
        self.assertEqual(user_profile.street_address, "Walnut Street")
        self.assertEqual(user_profile.city, "Philadelphia")
        self.assertEqual(user_profile.state, "Pennsylvania")
        self.assertEqual(user_profile.zip_code, 19104)
        self.assertEqual(user_profile.phone_number, "2158986636")
