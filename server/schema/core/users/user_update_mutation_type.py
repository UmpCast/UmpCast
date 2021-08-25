from graphene_django.rest_framework import mutation
from core.serializers import UserSerializer
from core.services import UserPermission
from graphql import GraphQLError
from graphql_jwt.decorators import login_required


class UserUpdateMutationType(mutation.SerializerMutation):
    class Meta:
        serializer_class = UserSerializer
        model_operations = ["update"]

    @classmethod
    @login_required
    def mutate(cls, root, info, input):
        id = input.get("id")
        if not UserPermission.has_update_permission(id, info.context.user):
            raise GraphQLError("Permission Denied")
        return super().mutate(root, info, input)
