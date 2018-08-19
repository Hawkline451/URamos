import json
import random

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.views import View
from rest_framework.decorators import api_view
from rest_framework.response import Response
from subject.models import Subject, Semester, Course

from .models import NaturalUser, UserCourses
from .serializers import NaturalUserSerializer


# Create your views here.

@api_view(['GET'])
def info_user(request):
    serializer = NaturalUserSerializer(NaturalUser.objects.get(user=request.user))
    return Response(serializer.data)


class LoadCourses(View):
    def post(self, request):
        # user = request.user
        # naturalUser = NaturalUser.objects.get(user=user)
        # rut = naturalUser.username # se usara para consultar a la api

        ##### por ahora #####
        naturalUser = NaturalUser.objects.get(user__username='18994829')

        listCourses = list(UserCourses.objects.filter(user=naturalUser).values('course', 'isEvaluate'))
        if not listCourses:
            ## Llamado a la api (parser)
            numberJson = random.randint(0, 5)
            if numberJson % 2 == 0:
                json_file = 'cursosTest1.json'
            else:
                json_file = 'cursosTest2.json'
            with open(json_file) as f:
                data = json.load(f)
            ### sacar los cursos aprobados, reprobados, aprobados (A)
            ### Pasarlos a la base de datos
            ### entregar: codigo, nombre, estado, semestre y año (para ordenar)
            for course in data:
                if course['id_estado_final'] == '1' or course['id_estado_final'] == '7' or course[
                    'id_estado_final'] == '14':
                    # curso apto para evaluar => guardar en base de datos
                    subject = Subject.objects.get(code=course['codigo'])
                    print(subject)
                    if (course['periodo'] == 1):
                        periodo = 'Otoño'
                    elif (course['periodo'] == 2):
                        periodo = 'Primavera'
                    else:
                        periodo = 'Verano'
                    semester = Semester.objects.get(year=course['ano'], name=periodo)
                    print(semester)
                    new_course = Course.objects.filter(subject=subject, semester=semester,
                                                       section=int(course['seccion']))  # .values('teacher__name')
                    # teacher = Teacher.objects.get(name=teacher_name)
                    print(new_course)
                    for teacher in new_course:
                        userCourse = UserCourses(user=naturalUser, course=teacher)
                        userCourse.save()
                        print('save course')

        data = UserCourses.objects.filter(user=naturalUser).values('course__subject__code', 'course__subject__name',
                                                                'course__semester__year', 'course__semester__name',
                                                                'isEvaluate')
        json_data = json.dumps(list(data), cls=DjangoJSONEncoder)

        return HttpResponse(json_data, content_type='application/json')
