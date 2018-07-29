from django.contrib.auth.models import User
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import render
from django.http import HttpResponse
import json
from .models import Subject, Course
from django.views import View


class Search(View):
    def post(self, request):
        key = request.POST.get('value')
        subjects = Subject.objects.filter(code__startswith=key).values('code', 'name')
        json_data = json.dumps(list(subjects), cls=DjangoJSONEncoder)
        return HttpResponse(json_data, content_type='application/json')


class InfoRamo (View) :
    def post (self, request) :
        data = {}
        code = request.POST.get ('value')

        subject = Subject.objects.get(pk=code)
        courses = Course.objects.filter(subject=subject).values('semester__name', 'semester__year', 'teacher', 'section', 'noteCourse', 'noteTeacher')



        data['code'] = code
        data['name'] = subject.name
        data['cursos'] = list(courses)
        data['notaCurso'] = subject.noteSubject
        json_data = json.dumps (data, cls=DjangoJSONEncoder)

        return HttpResponse (json_data, content_type='application/json')
