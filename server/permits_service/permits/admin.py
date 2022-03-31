from django.contrib import admin

from permits.models import UserOrganization


@admin.register(UserOrganization)
class UserOrganizationAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "updated_at")
