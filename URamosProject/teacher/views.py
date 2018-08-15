import json

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.views import View
from subject.models import Course, Subject

from .models import Teacher

import numpy as np


class InfoProfesor(View):
    def post(self, request):
        data = {}
        name = request.POST.get('value')

        prof = Teacher.objects.get(name__contains=name)
        courses = Course.objects.filter(teacher=prof).values('semester__name', 'semester__year', 'subject__code',
                                                             'subject__name', 'section', 'noteTeacher', 'votes')

        data['name'] = prof.name
        data['nota'] = prof.note
        data['cursos'] = list(courses)
        data['votosProfesor'] = prof.votes

        json_data = json.dumps(data, cls=DjangoJSONEncoder)

        return HttpResponse(json_data, content_type='application/json')
