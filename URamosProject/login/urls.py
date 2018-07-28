"""URamosProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
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
from django.urls import path
from django.conf.urls import url, include
from django.views import generic
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework import views, serializers, status
from rest_framework.response import Response

from .views import current_user, UserList, AuthView

from django.views.decorators.csrf import csrf_exempt


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()

class EchoView(views.APIView):
    def post(self, request, *args, **kwargs):
    	serializer = MessageSerializer(data=request.data)
    	serializer.is_valid(raise_exception=True)
    	return Response(serializer.data, status=status.HTTP_201_CREATED)

urlpatterns = [
    path('', (csrf_exempt)(AuthView.as_view())),
    path('/current_user/', current_user),
    path('/users/', UserList.as_view())
]