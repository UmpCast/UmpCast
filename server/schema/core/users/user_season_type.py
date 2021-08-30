import graphene


class UserSeasonType(graphene.Enum):

    ADMIN = "admin"
    REFEREE = "referee"
    ALL = "all"
