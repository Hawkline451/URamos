# Create your views here.

import json

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.views import View

from .models import ModeratorSubjects, Moderator


class Subjects(View):
    def post(self, request):
        moderator = Moderator.objects.get(user=request.user)
        moderatorSubjects = ModeratorSubjects.objects.filter(moderator=moderator).values('subject')
        json_data = json.dumps(list(moderatorSubjects), cls=DjangoJSONEncoder)
        return HttpResponse(json_data, content_type='application/json')
