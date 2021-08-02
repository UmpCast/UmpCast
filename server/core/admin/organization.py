from django.contrib import admin
from core.models import Organization, UserOrganization


class UserOrganizationInline(admin.TabularInline):
    model = UserOrganization
    extra = 1


@admin.register(UserOrganization)
class UserOrganizationAdmin(admin.ModelAdmin):
    pass


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    inlines = (UserOrganizationInline,)
