import json

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.views import View

from .models import Subject, Course
from teacher.models import Teacher
from comments.models import Comment

from datetime import date


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
        commentsList = list ()
        code = request.POST.get('value')

        subject = Subject.objects.get(pk=code)
        courses = Course.objects.filter (subject=subject)

        for course in courses :
            comments = Comment.objects.filter (course=course, isVisible=True, content__isnull=False).order_by ('ranking', 'date')

            comments = comments.values ('id', 'content', 'user__nickname', 'date', 'positivePoints', 'negativePoints',
                                        'isEdited', 'noteTeacher', 'noteCourse', 'course__subject__code',
                                        'course__subject__name', 'course__semester__name', 'course__semester__year',
                                        'course__teacher__name', 'course__section')
            for comment in comments:
                comment['date'] = comment['date'].strftime('%d - %m - %Y')
                commentsList.append(comment)

        courses = courses.values ('semester__name', 'semester__year', 'teacher',
                                                                'section', 'noteCourse', 'noteTeacher', 'votes')

        data['code'] = code
        data['name'] = subject.name
        data['cursos'] = list(courses)
        data['notaCurso'] = subject.noteSubject
        data['votosCurso'] = subject.votes
        data['comentarios'] = commentsList
        json_data = json.dumps(data, cls=DjangoJSONEncoder)

        return HttpResponse(json_data, content_type='application/json')

class SearchProf(View):
    def post(self,request):
        code = request.POST.get('value')

        subject = Subject.objects.get(pk=code)
        teachersAux = Course.objects.filter(subject=subject).values('teacher__name')

        teachers = []
        for teacher in teachersAux:
            if teacher not in teachers:
                teachers.append(teacher)

        #json_data = json.dumps(list(teachers), cls=DjangoJSONEncoder)
        data = []

        for teacherA in teachers:
            teacher = Teacher.objects.get(name=teacherA['teacher__name'])

            semesterAux = Course.objects.filter(subject=subject, teacher=teacher).values('semester__name', 'semester__year')
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
                for course in coursesAux:
                    note += course['noteTeacher']
                note = note / len(coursesAux)
                course = {'semester__year': semester['semester__year'], 'semester__name': semester['semester__name'],
                          'noteTeacher': note}
                courses.append(course)
                notes.append(note)
            dataAux = {'teacher': teacherA['teacher__name'], 'notes': notes, 'courses': courses}
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
        # print(minName,minYear,maxName,maxYear)

        # Create list of xLabel
        minIndexName = names.index(minName)
        maxIndexName = names.index(maxName)

        for year in range(minYear, maxYear + 1):
            if year == maxYear:
                name = str(year) + ' ' + names[minIndexName]
                xlabel.append(name)
                if names[maxIndexName] != names[minIndexName]:
                    minIndexName = (minIndexName + 1) % 3
                    name = str(year) + ' ' + names[minIndexName]
                    xlabel.append(name)
                    if names[maxIndexName] != names[minIndexName]:
                        minIndexName = (minIndexName + 1) % 3
                        name = str(year) + ' ' + names[minIndexName]
                        xlabel.append(name)
            else:
                name = str(year) + ' ' + names[minIndexName]
                minIndexName = (minIndexName + 1) % 3
                xlabel.append(name)
                if not minIndexName == 0:
                    name = str(year) + ' ' + names[minIndexName]
                    minIndexName = (minIndexName + 1) % 3
                    xlabel.append(name)
                    if not minIndexName == 0:
                        name = str(year) + ' ' + names[minIndexName]
                        minIndexName = (minIndexName + 1) % 3
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