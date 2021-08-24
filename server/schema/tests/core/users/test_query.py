from django.test import TestCase
import unittest.mock as mock
from schema.core.users.query import Query
from graphql_jwt.exceptions import PermissionDenied
from core.services import UserService
from graphql.execution.base import ResolveInfo
from model_bakery import baker
from django.contrib.auth.models import AnonymousUser


class UserQueryTest(TestCase):
    def setUp(self):
        self.user = baker.make("core.User")
        self.info = ResolveInfo(
            mock.Mock(),
            mock.Mock(),
            mock.Mock(),
            mock.Mock(),
            mock.Mock(),
            mock.Mock(),
            mock.Mock(),
            mock.Mock(),
            mock.Mock(),
            mock.Mock(user=self.user),
        )

    def test_resolve_me_login_required(self):
        self.info.context = mock.Mock(user=AnonymousUser())
        self.assertRaises(
            PermissionDenied,
            lambda: Query.resolve_me(
                mock.Mock(),
                self.info,
            ),
        )

    @mock.patch.object(UserService, "current_user")
    def test_resolve_me_calls_current_user(self, service_spy):
        Query.resolve_me(
            mock.Mock(),
            self.info,
        )
        service_spy.assert_called_once()
