from datetime import timedelta

from .settings import *

# Secrets

SECRET_KEY = "django-insecure-secret-key"

# Application

DEBUG = True

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# GraphQL JWT

GRAPHQL_JWT = {
    **GRAPHQL_JWT,
    "JWT_EXPIRATION_DELTA": timedelta(seconds=5)
}

# CORS

CORS_ALLOWED_ORIGINS = [
    'http://localhost:19006',
]