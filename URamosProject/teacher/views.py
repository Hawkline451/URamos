import json

from datetime import date
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

class SearchCourses(View):
    def post(self, request):
        data = []
        name = request.POST.get('value')
        teacher = Teacher.objects.get(name=name)
        subjectsAux = Course.objects.filter(teacher=teacher).values('subject__code', 'subject__name')

        subjects = []
        for subject in subjectsAux:
            if subject not in subjects:
                subjects.append(subject)

        # json_data = json.dumps(list(teachers), cls=DjangoJSONEncoder)
        data = []

        for subjectA in subjects:
            subject = Subject.objects.get(pk=subjectA['subject__code'])

            semesterAux = Course.objects.filter(subject=subject, teacher=teacher).values('semester__name',
                                                                                         'semester__year')
            semesters = []

            for semester in semesterAux:
                if semester not in semesters:
                    semesters.append(semester)

            courses = []
            notes = []

            for semester in semesters:
                coursesAux = list(
                    Course.objects.filter(subject=subject, teacher=teacher, semester__name=semester['semester__name'],
                                          semester__year=semester['semester__year']).values('noteTeacher'))
                note = 0.0
                count = 0
                for course in coursesAux:
                    if (course['noteTeacher'] != 0):
                        note += course['noteTeacher']
                        count += 1
                note = note / count
                course = {'semester__year': semester['semester__year'], 'semester__name': semester['semester__name'],
                          'noteTeacher': note}
                courses.append(course)
                notes.append(note)
            dataAux = {'subject': subjectA['subject__name'], 'notes': notes, 'courses': courses}
            data.append(dataAux)

        names = ["Verano", "Otoño", "Primavera"]
        minYear = date.today().year
        maxYear = 0
        minName = None
        maxName = None
        for dataAux in data:
            for course in dataAux['courses']:
                if course['semester__year'] <= minYear:
                    if course['semester__year'] == minYear:
                        if minName == None:
                            minName = course['semester__name']
                        elif names.index(minName) > names.index(course['semester__name']):
                            minName = course['semester__name']
                    else:
                        minYear = course['semester__year']
                        minName = course['semester__name']
                if course['semester__year'] >= maxYear:
                    if course['semester__year'] == maxYear:
                        if maxName == None:
                            maxName = course['semester__name']
                        elif names.index(maxName) < names.index(course['semester__name']):
                            maxName = course['semester__name']
                    else:
                        maxYear = course['semester__year']
                        maxName = course['semester__name']

        xlabel = []

        # Create list of xLabel
        minIndexName = names.index(minName)
        maxIndexName = names.index(maxName)

        for year in range(minYear, maxYear + 1):
            if year == maxYear:
                name = str(year) + ' ' + names[minIndexName]
                xlabel.append(name)
                if names[maxIndexName] != names[minIndexName]:
                    minIndexName = (minIndexName + 1)%3
                    name = str(year) + ' ' + names[minIndexName]
                    xlabel.append(name)
                    if names[maxIndexName] != names[minIndexName]:
                        minIndexName = (minIndexName + 1) % 3
                        name = str(year) + ' ' + names[minIndexName]
                        xlabel.append(name)
            else:
                name = str(year) + ' ' + names[minIndexName]
                minIndexName = (minIndexName + 1)%3
                xlabel.append(name)
                if not minIndexName == 0:
                    name = str(year) + ' ' + names[minIndexName]
                    minIndexName = (minIndexName + 1)%3
                    xlabel.append(name)
                    if not minIndexName == 0:
                        name = str(year) + ' ' + names[minIndexName]
                        minIndexName = (minIndexName + 1)%3
                        xlabel.append(name)


        # minYear + minName
        # maxYear + maxName
        # dataAux = {'teacher': teacherA['teacher__name'], 'notes': notes, 'courses': courses}
        # course = {'semester__year': semester['semester__year'], 'semester__name': semester['semester__name'], 'noteTeacher': note}

        for dataAux in data:
            notesClass = ['NaN'] * len(xlabel)
            for course in dataAux['courses']:
                semester = str(course['semester__year']) + ' ' + course['semester__name']
                indexSemester = xlabel.index(semester)
                notesClass[indexSemester] = course['noteTeacher']
            dataAux['notes'] = notesClass

        json_dataAux = {}
        json_dataAux['xlabel'] = xlabel
        json_dataAux['teacherData'] = data

        json_data = json.dumps(json_dataAux, cls=DjangoJSONEncoder)

        return HttpResponse(json_data, content_type='application/json')