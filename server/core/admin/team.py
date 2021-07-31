from django.contrib import admin
from core.models import Team


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    pass
