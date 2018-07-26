from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views import View
import json
import urllib.request
import urllib.parse

from naturalUser.models import NaturalUser
from django.contrib.auth.models import User


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
		user = None
		if User.objects.filter(username=rut).exists():
			user = User.objects.get(username=rut)
		else:
			user = User.objects.create_user(username=rut, password=rut, first_name=name)
			user.save()
			nu = NaturalUser(user = user, isLocked=False, isModerator=False)
			nu.save()

		print(HttpResponse('htpp://www.google.com'))
		return HttpResponse('htpp://www.google.com')

	def get(self, request):
		print("holi")
		return HttpResponse('htpp://www.google.com')

def Auth(request):
	print("hola")
	url_upasaporte = 'https://www.u-cursos.cl/upasaporte';
	servicio = 'uramos'

	ticket = request.POST['ticket']

	params = {'servicio': servicio, 'ticket':ticket, 'debug':2}
	data = urllib.request.urlopen(url_upasaporte+'/?'+urllib.parse.urlencode(params)).read()
	data = json.loads(data)


	rut = str(data['pers_id'])
	name = data['alias']
	user = None
	if User.objects.filter(username=rut).exists():
		user = User.objects.get(username=rut)
	else:
		user = User.objects.create_user(username=rut, password=rut, first_name=name)
		user.save()
		nu = NaturalUser(user = user, isLocked=False, isModerator=False)
		nu.save()

	return HttpResponse(str('htpp://www.google.com'))




