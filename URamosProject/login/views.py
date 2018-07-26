from django.shortcuts import render, redirect
from django.views import View
import json
import urllib.request


# Create your views here.
class AuthView(View):
	def post(self, request, *args, **kwargs):
		print("hola")
		url_upasaporte = 'https://www.u-cursos.cl/upasaporte';
		servicio = 'uramos'

		ticket = request.POST['ticket']
		print(ticket)

		params = {'servicio': servicio, 'ticket':ticket}
		data = urllib.request.urlopen(url_upasaporte+'/?'+urllib.urlencode(params)).read()
		data = json.loads(data)
		print(data)
		return redirect('http://www.google.com')
