from django.contrib import admin
from core.models import Listing


@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    pass
