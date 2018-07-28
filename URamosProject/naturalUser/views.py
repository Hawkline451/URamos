from django.shortcuts import render
from .models import NaturalUser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import NaturalUserSerializer


# Create your views here.

@api_view(['GET'])
def info_user(request):
	serializer = NaturalUserSerializer(NaturalUser.objects.get(user=request.user))
	return Response(serializer.data)
