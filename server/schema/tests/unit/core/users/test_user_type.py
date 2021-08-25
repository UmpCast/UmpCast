from django.test import TestCase
from model_bakery import baker
import unittest.mock as mock
from graphql.error.base import GraphQLError
from graphql_jwt.exceptions import PermissionDenied
from graphql.execution.base import ResolveInfo
from django.contrib.auth.models import AnonymousUser
from schema.core.types import UserType, UserOrganizationType, UserSeasonType
from core.services import UserPermission, UserService


class UserTypeTest(TestCase):
    def setUp(self):
        self.user = baker.make("core.User")
        args = [mock.Mock() for _ in range(9)]
        args.append(mock.Mock(user=self.user))
        self.info = ResolveInfo(*args)

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
