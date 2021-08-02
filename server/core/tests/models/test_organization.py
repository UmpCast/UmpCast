from django.test import TestCase
from core.models import Organization, UserOrganization, User
from model_bakery import baker
from django.db import IntegrityError


class OrganizationTest(TestCase):
    def test_create(self):
        organization = Organization.objects.create(
            name="Palo Alto Little League",
        )
        self.assertIsInstance(organization, Organization)

    def test_str(self):
        organization = Organization.objects.create(
            name="Palo Alto Little League",
        )
        self.assertEqual(str(organization), "Palo Alto Little League")

    def test_name_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: Organization.objects.create(name=None),
        )

    def test_name_is_unique(self):
        Organization.objects.create(
            name="Palo Alto Little League",
        )
        self.assertRaises(
            IntegrityError,
            lambda: Organization.objects.create(
                name="Palo Alto Little League",
            ),
        )

    def test_add_members(self):
        organization = Organization.objects.create(
            name="Palo Alto Little League",
        )
        user = baker.make(User)
        organization.members.add(user)
        self.assertIn(user, organization.members.all())

    def test_add_members_with_is_owner_default_true(self):
        organization = Organization.objects.create(
            name="Palo Alto Little League",
        )
        user = baker.make(User)
        organization.members.add(
            user,
            through_defaults={"is_owner": True},
        )
        user_organization = UserOrganization.objects.get(
            user=user,
            organization=organization,
        )
        self.assertTrue(user_organization.is_owner)

    def test_add_members_with_is_owner_default_false(self):
        organization = Organization.objects.create(
            name="Palo Alto Little League",
        )
        user = baker.make(User)
        organization.members.add(
            user,
            through_defaults={"is_owner": False},
        )
        user_organization = UserOrganization.objects.get(
            user=user,
            organization=organization,
        )
        self.assertFalse(user_organization.is_owner)

    def test_date_created_auto_now_add(self):
        organization = Organization.objects.create(
            name="Palo Alto Little League",
        )
        self.assertIsNotNone(organization.date_created)


class UserOrganizationTest(TestCase):
    def test_create(self):
        user_organization = UserOrganization.objects.create(
            user=baker.make(User),
            organization=baker.make(Organization),
        )
        self.assertIsInstance(user_organization, UserOrganization)

    def test_user_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: UserOrganization.objects.create(
                user=None,
                organization=baker.make(Organization),
            ),
        )

    def test_organization_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: UserOrganization.objects.create(
                user=baker.make(User),
                organization=None,
            ),
        )
