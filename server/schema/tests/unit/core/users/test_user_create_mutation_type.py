from django.test import TestCase
from model_bakery import baker
import unittest.mock as mock
from graphql.execution.base import ResolveInfo
from graphene_django.rest_framework import mutation
from django.contrib.auth.models import AnonymousUser
from schema.core.types import UserCreateMutationType
from core.services import UserPermission
from graphql.error.base import GraphQLError


class UserCreateMutationTypeTest(TestCase):
    def setUp(self):
        self.user = baker.make("core.User")
        args = [mock.Mock() for _ in range(9)]
        args.append(mock.Mock(user=self.user))
        self.info = ResolveInfo(*args)

    @mock.patch.object(mutation.SerializerMutation, "mutate", return_value=None)
    def test_mutate_login_not_required(self, mutate_spy):
        self.info.context = mock.Mock(user=AnonymousUser())
        UserCreateMutationType.mutate(
            mock.Mock(),
            self.info,
            mock.Mock(),
        )

    @mock.patch.object(UserPermission, "has_create_permission", return_value=True)
    @mock.patch.object(mutation.SerializerMutation, "mutate", return_value=None)
    def test_mutate_checks_permissions(self, mutate_spy, permission_spy):
        UserCreateMutationType.mutate(
            mock.Mock(),
            self.info,
            mock.Mock(),
        )
        permission_spy.assert_called_once_with(self.info.context.user)

    @mock.patch.object(UserPermission, "has_create_permission", return_value=False)
    @mock.patch.object(mutation.SerializerMutation, "mutate", return_value=None)
    def test_mutate_raises_error_if_no_permissions(self, mutate_spy, permission_spy):
        self.assertRaises(
            GraphQLError,
            lambda: UserCreateMutationType.mutate(mock.Mock(), self.info, mock.Mock()),
        )
        permission_spy.assert_called_once_with(self.info.context.user)

    @mock.patch.object(UserPermission, "has_create_permission", return_value=True)
    @mock.patch.object(mutation.SerializerMutation, "mutate", return_value=None)
    def test_mutate_calls_super(self, mutate_spy, permission_spy):
        UserCreateMutationType.mutate(mock.Mock(), self.info, mock.Mock())
        mutate_spy.assert_called_once()
