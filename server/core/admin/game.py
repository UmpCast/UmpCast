from django.contrib import admin
from core.models import Game


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    pass
