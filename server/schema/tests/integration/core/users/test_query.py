from snapshottest import TestCase
from graphql_jwt.testcases import JSONWebTokenTestCase
from core.models import User
from model_bakery import baker
import json


class UserQueryTest(TestCase, JSONWebTokenTestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="ben_franklin@upenn.edu",
            first_name="Ben",
            last_name="Franklin",
            password="benfranklin123",
        )

    def test_me(self):
        self.client.authenticate(self.user)
        query = """
            query {
                me {
                    id,
                    lastLogin,
                    email,
                    firstName,
                    lastName
                }
            }
        """
        response = self.client.execute(query)
        self.assertMatchSnapshot(json.dumps(response.to_dict(), indent=4))

    def test_me_organizations_all(self):
        self.client.authenticate(self.user)
        organization_1 = baker.make(
            "core.Organization",
            name="University of Pennsylvania",
        )
        organization_2 = baker.make(
            "core.Organization",
            name="Georgetown University",
        )
        organization_1.members.add(
            self.user,
            through_defaults={"is_owner": True},
        )
        organization_2.members.add(
            self.user,
            through_defaults={"is_owner": False},
        )
        query = """
            query($userOrganizationType: UserOrganizationType!) {
                me {
                    organizations(userOrganizationType: $userOrganizationType) {
                        name
                    }
                }
            }
        """
        variables = {
            "userOrganizationType": "ALL",
        }
        response = self.client.execute(query, variables)
        self.assertMatchSnapshot(json.dumps(response.to_dict(), indent=4))

    def test_me_organizations_member(self):
        self.client.authenticate(self.user)
        organization_1 = baker.make(
            "core.Organization",
            name="University of Pennsylvania",
        )
        organization_2 = baker.make(
            "core.Organization",
            name="Georgetown University",
        )
        organization_1.members.add(
            self.user,
            through_defaults={"is_owner": True},
        )
        organization_2.members.add(
            self.user,
            through_defaults={"is_owner": False},
        )
        query = """
            query($userOrganizationType: UserOrganizationType!) {
                me {
                    organizations(userOrganizationType: $userOrganizationType) {
                        name
                    }
                }
            }
        """
        variables = {
            "userOrganizationType": "MEMBER",
        }
        response = self.client.execute(query, variables)
        self.assertMatchSnapshot(json.dumps(response.to_dict(), indent=4))

    def test_me_organizations_owner(self):
        self.client.authenticate(self.user)
        organization_1 = baker.make(
            "core.Organization",
            name="University of Pennsylvania",
        )
        organization_2 = baker.make(
            "core.Organization",
            name="Georgetown University",
        )
        organization_1.members.add(
            self.user,
            through_defaults={"is_owner": True},
        )
        organization_2.members.add(
            self.user,
            through_defaults={"is_owner": False},
        )
        query = """
            query($userOrganizationType: UserOrganizationType!) {
                me {
                    organizations(userOrganizationType: $userOrganizationType) {
                        name
                    }
                }
            }
        """
        variables = {
            "userOrganizationType": "OWNER",
        }
        response = self.client.execute(query, variables)
        self.assertMatchSnapshot(json.dumps(response.to_dict(), indent=4))

    def test_me_season_admin(self):
        self.client.authenticate(self.user)
        baker.make(
            "core.UserSeason",
            user=self.user,
            season=baker.make("core.Season", name="Referee Season"),
            permission_type="referee",
        )
        baker.make(
            "core.UserSeason",
            user=self.user,
            season=baker.make("core.Season", name="Admin Season"),
            permission_type="admin",
        )
        query = """
            query($userOrganizationType: UserSeasonType!) {
                me {
                    seasons(userSeasonType: $userOrganizationType) {
                        name
                    }
                }
            }
        """
        variables = {
            "userOrganizationType": "ADMIN",
        }
        response = self.client.execute(query, variables)
        self.assertMatchSnapshot(json.dumps(response.to_dict(), indent=4))

    def test_me_season_all(self):
        self.client.authenticate(self.user)
        baker.make(
            "core.UserSeason",
            user=self.user,
            season=baker.make("core.Season", name="Referee Season"),
            permission_type="referee",
        )
        baker.make(
            "core.UserSeason",
            user=self.user,
            season=baker.make("core.Season", name="Admin Season"),
            permission_type="admin",
        )
        query = """
            query($userOrganizationType: UserSeasonType!) {
                me {
                    seasons(userSeasonType: $userOrganizationType) {
                        name
                    }
                }
            }
        """
        variables = {
            "userOrganizationType": "ALL",
        }
        response = self.client.execute(query, variables)
        self.assertMatchSnapshot(json.dumps(response.to_dict(), indent=4))

    def test_me_season_referee(self):
        self.client.authenticate(self.user)
        baker.make(
            "core.UserSeason",
            user=self.user,
            season=baker.make("core.Season", name="Referee Season"),
            permission_type="referee",
        )
        baker.make(
            "core.UserSeason",
            user=self.user,
            season=baker.make("core.Season", name="Admin Season"),
            permission_type="admin",
        )
        query = """
            query($userOrganizationType: UserSeasonType!) {
                me {
                    seasons(userSeasonType: $userOrganizationType) {
                        name
                    }
                }
            }
        """
        variables = {
            "userOrganizationType": "REFEREE",
        }
        response = self.client.execute(query, variables)
        self.assertMatchSnapshot(json.dumps(response.to_dict(), indent=4))

    def test_me_unauthorized(self):
        query = """
            query {
                me {
                    id,
                    lastLogin,
                    email,
                    firstName,
                    lastName
                }
            }
        """
        response = self.client.execute(query)
        self.assertMatchSnapshot(json.dumps(response.to_dict(), indent=4))
