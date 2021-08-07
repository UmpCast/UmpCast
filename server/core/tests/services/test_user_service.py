from core.services import UserService
from django.test import TestCase
from model_bakery import baker
from core.models import User


class UserServiceTest(TestCase):
    def test_current_user(self):
        user = baker.make(User)
        user_service = UserService(user)
        current_user = user_service.current_user()
        self.assertEqual(user, current_user)
