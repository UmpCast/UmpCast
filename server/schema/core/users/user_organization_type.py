import graphene


class UserOrganizationType(graphene.Enum):

    MEMBER = "member"
    OWNER = "owner"
    ALL = "all"
