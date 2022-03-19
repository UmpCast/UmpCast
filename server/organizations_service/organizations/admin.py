from django.contrib import admin

from organizations.models import Organization, Season, Division, Position


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "updated_at")


@admin.register(Season)
class SeasonAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "updated_at")


@admin.register(Division)
class DivisionAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "updated_at")


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "updated_at")
