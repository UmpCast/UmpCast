from rest_framework import serializers
from core.models import User
import django.contrib.auth.password_validation as validators


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "password",
            "is_active",
            "is_staff",
            "is_superuser",
            "last_login",
            "date_created",
        )
        read_only_fields = (
            "id",
            "is_active",
            "is_staff",
            "is_superuser",
            "last_login",
            "date_created",
        )
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def validate_password(self, password):
        validators.validate_password(password=password)
        return password

    def create(self, validated_data) -> User:
        user = User.objects.create_user(**validated_data)
        return user
