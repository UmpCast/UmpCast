from django.test import TestCase
import unittest.mock as mock
from graphql.error.base import GraphQLError
from graphql_jwt.exceptions import PermissionDenied
from schema.core.types import (
    UserType,
    UserOrganizationType,
    UserSeasonType,
    UserCreateMutationType,
    UserUpdateMutationType,
)
from core.services import UserPermission, UserService
from graphql.execution.base import ResolveInfo
from model_bakery import baker
from django.contrib.auth.models import AnonymousUser
from graphene_django.rest_framework import mutation


class UserOrganizationTypeTest(TestCase):
    pass


class UserSeasonTypeTest(TestCase):
    pass


class UserTypeTest(TestCase):
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

    def test_resolve_organizations_login_required(self):
        self.info.context = mock.Mock(user=AnonymousUser())
        self.assertRaises(
            PermissionDenied,
            lambda: UserType.resolve_organizations(
                self.user,
                self.info,
                UserOrganizationType.ALL,
            ),
        )

    @mock.patch.object(
        UserPermission, "has_resolve_organizations_permission", return_value=True
    )
    def test_resolve_organizations_checks_permissions(self, permission_spy):
        UserType.resolve_organizations(self.user, self.info, UserOrganizationType.ALL)
        permission_spy.assert_called_once_with(self.info.context.user)

    @mock.patch.object(
        UserPermission, "has_resolve_organizations_permission", return_value=False
    )
    def test_resolve_organizations_raises_error_if_no_permissions(self, permission_spy):
        self.assertRaises(
            GraphQLError,
            lambda: UserType.resolve_organizations(
                self.user, self.info, UserOrganizationType.ALL
            ),
        )
        permission_spy.assert_called_once_with(self.info.context.user)

    @mock.patch.object(
        UserPermission, "has_resolve_organizations_permission", return_value=True
    )
    @mock.patch.object(UserService, "owned_organizations", return_value=[])
    def test_resolve_organizations_owner(self, service_spy, permission_spy):
        UserType.resolve_organizations(self.user, self.info, UserOrganizationType.OWNER)
        service_spy.assert_called_once()

    @mock.patch.object(
        UserPermission, "has_resolve_organizations_permission", return_value=True
    )
    @mock.patch.object(UserService, "member_organizations", return_value=[])
    def test_resolve_organizations_member(self, service_spy, permission_spy):
        UserType.resolve_organizations(
            self.user, self.info, UserOrganizationType.MEMBER
        )
        service_spy.assert_called_once()

    @mock.patch.object(
        UserPermission, "has_resolve_organizations_permission", return_value=True
    )
    @mock.patch.object(UserService, "all_organizations", return_value=[])
    def test_resolve_organizations_all(self, service_spy, permission_spy):
        UserType.resolve_organizations(self.user, self.info, UserOrganizationType.ALL)
        service_spy.assert_called_once()

    def test_resolve_seasons_login_required(self):
        self.info.context = mock.Mock(user=AnonymousUser())
        self.assertRaises(
            PermissionDenied,
            lambda: UserType.resolve_seasons(
                self.user,
                self.info,
                UserSeasonType.ALL,
            ),
        )

    @mock.patch.object(
        UserPermission, "has_resolve_seasons_permission", return_value=True
    )
    def test_resolve_seasons_checks_permissions(self, permission_spy):
        UserType.resolve_seasons(self.user, self.info, UserSeasonType.ALL)
        permission_spy.assert_called_once_with(self.info.context.user)

    @mock.patch.object(
        UserPermission, "has_resolve_seasons_permission", return_value=False
    )
    def test_resolve_seasons_raises_error_if_no_permissions(self, permission_spy):
        self.assertRaises(
            GraphQLError,
            lambda: UserType.resolve_seasons(self.user, self.info, UserSeasonType.ALL),
        )
        permission_spy.assert_called_once_with(self.info.context.user)

    @mock.patch.object(
        UserPermission, "has_resolve_seasons_permission", return_value=True
    )
    @mock.patch.object(UserService, "admin_seasons", return_value=[])
    def test_resolve_seasons_owner(self, service_spy, permission_spy):
        UserType.resolve_seasons(self.user, self.info, UserSeasonType.ADMIN)
        service_spy.assert_called_once()

    @mock.patch.object(
        UserPermission, "has_resolve_seasons_permission", return_value=True
    )
    @mock.patch.object(UserService, "referee_seasons", return_value=[])
    def test_resolve_seasons_referee(self, service_spy, permission_spy):
        UserType.resolve_seasons(self.user, self.info, UserSeasonType.REFEREE)
        service_spy.assert_called_once()

    @mock.patch.object(
        UserPermission, "has_resolve_seasons_permission", return_value=True
    )
    @mock.patch.object(UserService, "all_seasons", return_value=[])
    def test_resolve_seasons_all(self, service_spy, permission_spy):
        UserType.resolve_seasons(self.user, self.info, UserSeasonType.ALL)
        service_spy.assert_called_once()


class UserCreateMutationTypeTest(TestCase):
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


class UserUpdateMutationTypeTest(TestCase):
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
