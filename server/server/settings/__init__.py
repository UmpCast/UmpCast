from decouple import config  # type: ignore
from django.core.exceptions import ImproperlyConfigured

env_name = config("ENV_NAME")

if env_name == "Production":
    from .prod import *
elif env_name == "Development":
    from .dev import *
else:
    raise ImproperlyConfigured("Invalid ENV_NAME")
