from django.contrib import admin
from core.models import Location


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    pass
