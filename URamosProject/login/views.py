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


		rut = data['pers_id']
		name = data['alias']
		user = None
		if User.objects.filter(username=rut).exists():
			user = User.objects.get(username=rut)
		else:
			user = User.objects.create_user(username=rut, password = rut, first_name=nombre)
			user.save()



		redirect('http://www.google.com')
		return HttpResponse('htpp://www.google.com')

