import json

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.views import View

from .models import Subject, Course
from comments.models import Comment


class Search(View):
    def post(self, request):
        keys = json.loads(request.body.decode('utf-8'))
        if keys['typeSearch'] == 'codigo':
            subjects = Subject.objects.filter(code__startswith=keys['value']).values('code', 'name')
        else:
            subjects = Subject.objects.filter(name__startswith=keys['value']).values('code', 'name')
        json_data = json.dumps(list(subjects), cls=DjangoJSONEncoder)
        return HttpResponse(json_data, content_type='application/json')


class SearchCourses(View):
    def post(self, request):
        large = 10
        key = json.loads(request.body.decode('utf-8'))
        if key['code'] != '':
            if key['byNameAndCode']:
                subjects = Subject.objects.filter(code__startswith=key['code'], name__icontains=key['value']).values(
                    'code', 'name', 'noteSubject', 'votes')
            else:
                subjects = Subject.objects.filter(code__startswith=key['code']).values('code', 'name', 'noteSubject', 'votes')
        else:
            subjects = Subject.objects.filter(name__icontains=key['value']).values('code', 'name', 'noteSubject', 'votes')
        total_data = len(subjects)
        print(subjects)
        if key['page'] == '1':
            subjects = subjects[0:large + 1]
        else:
            subjects = subjects[(key['page'] - 1) * large:key['page'] * large]

        subjects.append({'page': total_data})
        json_data = json.dumps(list(subjects), cls=DjangoJSONEncoder)
        return HttpResponse(json_data, content_type='application/json')


class InfoRamo(View):
    def post(self, request):
        data = {}
        code = request.POST.get('value')

        subject = Subject.objects.get(pk=code)
        courses = Course.objects.filter(subject=subject).values('semester__name', 'semester__year', 'teacher',
                                                                'section', 'noteCourse', 'noteTeacher', 'votes')

        data['code'] = code
        data['name'] = subject.name
        data['cursos'] = list(courses)
        data['notaCurso'] = subject.noteSubject
        data['votosCurso'] = subject.votes
        json_data = json.dumps(data, cls=DjangoJSONEncoder)

        return HttpResponse(json_data, content_type='application/json')
