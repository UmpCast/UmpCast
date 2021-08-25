from graphene_django.rest_framework import mutation
from core.serializers import UserSerializer
from core.services import UserPermission
from graphql import GraphQLError


class UserCreateMutationType(mutation.SerializerMutation):
    class Meta:
        serializer_class = UserSerializer
        model_operations = ["create"]

    @classmethod
    def mutate(cls, root, info, input):
        if not UserPermission.has_create_permission(info.context.user):
            raise GraphQLError("Permission Denied")
        return super().mutate(root, info, input)
