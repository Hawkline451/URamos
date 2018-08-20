# Create your views here.

import json

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.views import View
from rest_framework.decorators import api_view

from .models import ModeratorSubjects, Moderator
from subject.models import Subject
from rest_framework.decorators import api_view




class SubjectsView(View):
    def post(self, request):
        moderator = Moderator.objects.get(user=request.user)
        moderatorSubjects = ModeratorSubjects.objects.filter(moderator=moderator).values('subject')
        json_data = json.dumps(list(moderatorSubjects), cls=DjangoJSONEncoder)
        return HttpResponse(json_data, content_type='application/json')


@api_view(['POST'])
def isModeratorCourse(request):

    if Moderator.objects.filter(user=request.user).exists():

        mod = Moderator.objects.get(user=request.user);
        subject = Subject.objects.get(pk=request.POST.get('value'))

        ans = False
        if ModeratorSubjects.objects.filter(subject=subject, moderator=mod).exists():
            ans = True

        json_data = json.dumps({'isModerator':ans}, cls =DjangoJSONEncoder)  
        return HttpResponse(json_data, content_type='application/json')

    else:
        json_data = json.dumps({'isModerator':False}, cls =DjangoJSONEncoder)  
        return HttpResponse(json_data, content_type='application/json')

@api_view(['POST'])
def ModerateCourses(request):
    user = request.user
    moderator = Moderator.objects.get(user=user)
    listCourses = ModeratorSubjects.objects.filter(moderator=moderator).values('subject__code', 'subject__name', 'subject__department')
    json_data = json.dumps(list(listCourses), cls=DjangoJSONEncoder)


    return HttpResponse(json_data, content_type='application/json')

