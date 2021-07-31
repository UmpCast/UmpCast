from django.contrib import admin
from core.models import Position


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    pass
