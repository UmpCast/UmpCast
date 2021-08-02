from django.contrib import admin
from core.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass
