from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def Test(request) :
    print('holi')

    return HttpResponse('holi')