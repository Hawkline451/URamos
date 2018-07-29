import json

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.views import View

from .models import Subject


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
        if key['byCode']:
            print(key['value'])
            subjects = Subject.objects.filter(code__startswith=key['value']).values('code', 'name', 'note')
        else:
            subjects = Subject.objects.filter(name__icontains=key['value']).values('code', 'name', 'note')
            print(subjects)
        total_data = len(subjects)
        print(total_data)
        if key['page'] == '1':
            subjects = subjects[0:large + 1]
        else:
            subjects = subjects[(key['page'] - 1) * large:key['page'] * large]
        subjects.append({'page': total_data})
        json_data = json.dumps(list(subjects), cls=DjangoJSONEncoder)
        return HttpResponse(json_data, content_type='application/json')
