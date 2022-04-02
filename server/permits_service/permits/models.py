from django.db import models


class UserOrganization(models.Model):
    user_id = models.CharField(max_length=255)
    organization_id = models.CharField(max_length=255)

    is_owner = models.BooleanField(default=False)
    is_member = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserSeason(models.Model):
    user_id = models.CharField(max_length=255)
    season_id = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)
    max_casts = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserRole(models.Model):
    user_id = models.CharField(max_length=255)
    role_id = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserGameRole(models.Model):
    user_id = models.CharField(max_length=255)
    game_id = models.CharField(max_length=255)
    role_id = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
