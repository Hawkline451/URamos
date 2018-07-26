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
        subjects = Subject.objects.filter(code__icontains=key).values('code', 'name')
        json_data = json.dumps(list(subjects), cls=DjangoJSONEncoder)
        return HttpResponse(json_data, content_type='application/json')
