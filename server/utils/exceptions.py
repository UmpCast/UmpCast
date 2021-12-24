class ServerError(Exception):
    pass


class AuthenticationError(ServerError):
    pass


class AuthorizationError(ServerError):
    pass
