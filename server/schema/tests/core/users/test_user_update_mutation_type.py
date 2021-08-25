from django.test import TestCase
from model_bakery import baker
import unittest.mock as mock
from graphql.execution.base import ResolveInfo
from graphene_django.rest_framework import mutation
from django.contrib.auth.models import AnonymousUser
from graphql_jwt.exceptions import PermissionDenied
from schema.core.types import UserUpdateMutationType
from core.services import UserPermission
from graphql.error.base import GraphQLError


class UserUpdateMutationTypeTest(TestCase):
    def setUp(self):
        self.user = baker.make("core.User")
        args = [mock.Mock() for _ in range(9)]
        args.append(mock.Mock(user=self.user))
        self.info = ResolveInfo(*args)
        self.input = {
            "id": self.user.id,
        }

    @mock.patch.object(mutation.SerializerMutation, "mutate", return_value=None)
    def test_mutate_login_required(self, mutate_spy):
        self.info.context = mock.Mock(user=AnonymousUser())
        self.assertRaises(
            PermissionDenied,
            lambda: UserUpdateMutationType.mutate(
                mock.Mock(),
                self.info,
                self.input,
            ),
        )

    @mock.patch.object(UserPermission, "has_update_permission", return_value=True)
    @mock.patch.object(mutation.SerializerMutation, "mutate", return_value=None)
    def test_mutate_checks_permissions(self, mutate_spy, permission_spy):
        UserUpdateMutationType.mutate(
            mock.Mock(),
            self.info,
            self.input,
        )
        permission_spy.assert_called_once_with(
            self.input.get("id"),
            self.info.context.user,
        )

    @mock.patch.object(UserPermission, "has_update_permission", return_value=False)
    @mock.patch.object(mutation.SerializerMutation, "mutate", return_value=None)
    def test_mutate_raises_error_if_no_permissions(self, mutate_spy, permission_spy):
        self.assertRaises(
            GraphQLError,
            lambda: UserUpdateMutationType.mutate(
                mock.Mock(),
                self.info,
                self.input,
            ),
        )
        permission_spy.assert_called_once_with(
            self.input.get("id"),
            self.info.context.user,
        )

    @mock.patch.object(UserPermission, "has_update_permission", return_value=True)
    @mock.patch.object(mutation.SerializerMutation, "mutate", return_value=None)
    def test_mutate_calls_super(self, mutate_spy, permission_spy):
        UserUpdateMutationType.mutate(
            mock.Mock(),
            self.info,
            self.input,
        )
        mutate_spy.assert_called_once()
