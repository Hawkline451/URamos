from django.contrib.auth.models import User
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import render
from django.http import HttpResponse
import json

'''
def Test(request) :
    data = [{'label': 'Atun'}, {'label': 'Arroz'}]
    json_data = json.dumps(data, cls=DjangoJSONEncoder)
    return HttpResponse(json_data, content_type='application/json')
'''

def Search(request):

    return