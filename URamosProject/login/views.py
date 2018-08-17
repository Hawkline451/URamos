from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.views import View
import json
import urllib.request
import urllib.parse

from naturalUser.models import NaturalUser
from teacher.models import Teacher
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken
from rest_framework_jwt.settings import api_settings


# Create your views here.
class AuthView(View):
	def post(self, request, *args, **kwargs):
		url_upasaporte = 'https://www.u-cursos.cl/upasaporte';
		servicio = 'uramos'

		ticket = request.POST['ticket']

		params = {'servicio': servicio, 'ticket':ticket}
		data = urllib.request.urlopen(url_upasaporte+'/?'+urllib.parse.urlencode(params)).read()
		data = json.loads(data)

		rut = str(data['pers_id'])
		name = data['alias'].split(' ')
		first_name = name[0]
		last_name = name[1]
		user = None
		if not User.objects.filter(username=rut).exists():
			user = User.objects.create_user(username=rut, password=rut,
			 first_name=first_name, last_name=last_name)
			user.save()			
			nu = NaturalUser(user = user, isLocked=False, isModerator=False, isTeacher=False)
			
			teacher = Teacher.objects.filter(name=data['alias'])
			if(teacher):
				nu.isTeacher = True
				nu.teacherName = data['alias']

			nu.setNickName()
			nu.save()
			
		user = authenticate(username=rut, password=rut)

		jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
		jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

		payload = jwt_payload_handler(user)
		token = jwt_encode_handler(payload)

		print(token)

		return HttpResponse(str('http://142.93.4.35:8000/login/'+token))


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

