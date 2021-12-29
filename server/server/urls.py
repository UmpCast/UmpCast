"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from ariadne.contrib.django.views import GraphQLView
from ariadne.contrib.tracing.apollotracing import ApolloTracingExtensionSync
from django.contrib import admin
from django.urls import path

from auth.context import get_context_value
from schema.schema import schema

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "graphql/",
        GraphQLView.as_view(
            schema=schema,
            context_value=get_context_value,
            playground_options={
                "settings": {
                    "request.credentials": "same-origin",
                    "tracing.hideTracingResponse": False,
                    "editor.cursorShape": "block",
                }
            },
            extensions=[ApolloTracingExtensionSync],
        ),
    ),
]
