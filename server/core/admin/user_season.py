from django.contrib import admin
from core.models import UserSeason


@admin.register(UserSeason)
class UserSeasonAdmin(admin.ModelAdmin):
    pass
