from django.contrib.auth.models import User
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import render
from django.http import HttpResponse
import json
from .models import Subject
from django.views import View

class Search(View):
    def post(self, request):
        key = request.POST.get('value')
        subjects = Subject.objects.filter(code__startswith=key).values('code', 'name')
        json_data = json.dumps(list(subjects), cls=DjangoJSONEncoder)
        return HttpResponse(json_data, content_type='application/json')

class SearchCourses(View):
    def post(self, request):
        large = 10
        key = json.loads(request.body.decode('utf-8'))
        subjects = Subject.objects.filter(name__icontains=key['value']).values('code', 'name', 'note')
        print(key['page'])
        print((key['page']-1)*large)
        total_data = len(subjects)
        if key['page'] == '1':
            subjects = subjects[0:large+1]
        else:
            subjects = subjects[(key['page']-1)*large:key['page']*large]
        json_data = json.dumps(list(subjects), cls=DjangoJSONEncoder)
        return HttpResponse(json_data, content_type='application/json')
