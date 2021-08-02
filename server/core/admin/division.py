from django.contrib import admin
from core.models import Division


@admin.register(Division)
class DivisionAdmin(admin.ModelAdmin):
    pass
