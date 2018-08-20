import json

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.views import View

from .models import Record

class LogSearch(View):
    def post(self, request):
        lengthList = 20
        logList = Record.objects.all().order_by('date')[:lengthList].values('firstComment', 'secondComment', 'typeRecord')
        json_data = json.dumps(list(logList), cls=DjangoJSONEncoder)
        return HttpResponse(json_data, content_type='application/json')
