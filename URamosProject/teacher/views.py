from django.shortcuts import render
from django.contrib.auth.models import User
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import render
from django.http import HttpResponse
import json
from .models import Teacher
from subject.models import Course
from django.views import View


class InfoProfesor (View) :
    def post (self, request) :
        data = {}
        name = request.POST.get ('value')

        prof = Teacher.objects.get (name__contains=name)
        courses = Course.objects.filter (teacher=prof).values ('semester__name', 'semester__year', 'subject__code',
                                                               'subject__name', 'section', 'noteTeacher')

        data ['name'] = prof.name
        data ['nota'] = prof.note
        data ['cursos'] = list (courses)

        json_data = json.dumps (data, cls=DjangoJSONEncoder)

        return HttpResponse (json_data, content_type='application/json')
