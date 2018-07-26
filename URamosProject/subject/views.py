from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponse


def Test(request) :
    print('holi')

    return HttpResponse('holi')