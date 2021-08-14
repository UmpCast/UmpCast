from .base_settings import *
import os

SECRET_KEY = os.environ['SECRET_KEY']

ALLOWED_HOSTS = []

MIDDLEWARE.extend([
    "django.middleware.csrf.CsrfViewMiddleware"
])
