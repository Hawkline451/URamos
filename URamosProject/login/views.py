from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.views import View
import json
import urllib.request
import urllib.parse

from naturalUser.models import NaturalUser
from django.contrib.auth.models import User

from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken


# Create your views here.
class AuthView(View):
	def post(self, request, *args, **kwargs):
		print("hola")
		url_upasaporte = 'https://www.u-cursos.cl/upasaporte';
		servicio = 'uramos'

		ticket = request.POST['ticket']

		params = {'servicio': servicio, 'ticket':ticket}
		data = urllib.request.urlopen(url_upasaporte+'/?'+urllib.parse.urlencode(params)).read()
		data = json.loads(data)


		rut = str(data['pers_id'])
		name = data['alias']
		print(name)
		name = name.split(' ')
		first_name = name[0]
		last_name = name[1]
		user = None
		if not User.objects.filter(username=rut).exists():
			user = User.objects.create_user(username=rut, password=rut, first_name=name)
			user.save()
			nu = NaturalUser(user = user, isLocked=False, isModerator=False)
			nu.save()

		return HttpResponse(str('http://142.93.4.35:8000/login/'+str(rut)))


@api_view(['GET'])
def current_user(request):
	"""
	Determine the current user by their token, and return their data
	"""
	serializer = UserSerializer(request.user)
	return Response(serializer.data)


class UserList(APIView):
	"""
	Create a new user. It's called 'UserList' because normally we'd have a get
	method here too, for retrieving a list of all User objects.
	"""
	permission_classes = (permissions.AllowAny,)

	def post(self, request, format=None):
		serializer = UserSerializerWithToken(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

