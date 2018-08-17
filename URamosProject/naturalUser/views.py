from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import NaturalUser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import NaturalUserSerializer


# Create your views here.

@api_view(['GET'])
def info_user(request):
	serializer = NaturalUserSerializer(NaturalUser.objects.get(user=request.user))
	return Response(serializer.data)

def unlock(request, user_id):
	user = NaturalUser.objects.get(pk=user_id)

	user.isLocked = False
	user.save()

	url = reverse ('admin:{}_{}_change'.format (user._meta.app_label, user._meta.model_name),
				   args=[user.pk],
				   current_app='admin',
				   )

	return HttpResponseRedirect (url)