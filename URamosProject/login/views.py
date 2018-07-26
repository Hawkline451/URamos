from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views import View
import json
import urllib.request
import urllib.parse

from naturalUser.models import naturalUser
from django.contrib.auth.models import User


# Create your views here.
class AuthView(View):
	def post(self, request, *args, **kwargs):
		print("hola")
		url_upasaporte = 'https://www.u-cursos.cl/upasaporte';
		servicio = 'uramos'

		ticket = request.POST['ticket']
		print(ticket)

		params = {'servicio': servicio, 'ticket':ticket}
		data = urllib.request.urlopen(url_upasaporte+'/?'+urllib.parse.urlencode(params)).read()
		data = json.loads(data)
		print(data)

		print(data['pers_id'])


		redirect('http://www.google.com')
		return HttpResponse('htpp://www.google.com')

