from rest_framework import serializers
from core.models import User


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

    def create(self, validated_data) -> User:
        user = User.objects.create_user(**validated_data)
        return user
