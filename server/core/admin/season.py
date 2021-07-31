from django.contrib import admin
from core.models import Season


@admin.register(Season)
class SeasonAdmin(admin.ModelAdmin):
    pass
