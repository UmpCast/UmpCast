from django.contrib import admin

from permits.models import UserOrganization, UserSeason, UserRole, UserGameRole


@admin.register(UserOrganization)
class UserOrganizationAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "updated_at")


@admin.register(UserSeason)
class UserSeasonAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "updated_at")


@admin.register(UserRole)
class UserRoleAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "updated_at")


@admin.register(UserGameRole)
class UserGameRoleAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "updated_at")
