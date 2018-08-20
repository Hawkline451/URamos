import json
import random

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from subject.models import Subject, Semester, Course

from .models import NaturalUser, UserCourses
from .serializers import NaturalUserSerializer


# Create your views here.

def contain(course, listCourse):
    for item in listCourse:
        if course['pk'] == item['course']:
            return True
    return False


@api_view(['GET'])
def info_user(request):
    serializer = NaturalUserSerializer(NaturalUser.objects.get(user=request.user))
    return Response(serializer.data)


@api_view(['POST'])
def LoadCourses(request):
    reload = json.loads(request.body.decode('utf-8'))['load']

    ##### por ahora #####
    user = request.user
    naturalUser = NaturalUser.objects.get(user=user)
    # rut = naturalUser.username # se usara para consultar a la api
    #naturalUser = NaturalUser.objects.get(user__username='18994829')

    listCourses = list(UserCourses.objects.filter(user=naturalUser).values('course'))
    if not listCourses or reload:
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
                if (course['periodo'] == 1):
                    periodo = 'Otoño'
                elif (course['periodo'] == 2):
                    periodo = 'Primavera'
                else:
                    periodo = 'Verano'
                semester = Semester.objects.get(year=course['ano'], name=periodo)
                new_course = Course.objects.filter(subject=subject, semester=semester,
                                                   section=int(course['seccion'])).values('pk')
                for teacher in new_course:
                    if not contain(teacher, listCourses):  # para no guardar los existentes cuando hay reload
                        courseUser = Course.objects.get(pk=teacher['pk'])
                        userCourse = UserCourses(user=naturalUser, course=courseUser)
                        userCourse.save()
                        print('save course')

    dataCourses = UserCourses.objects.filter(user=naturalUser).values('course__subject__code', 'course__subject__name',
                                                                      'course__semester__year',
                                                                      'course__semester__name',
                                                                      'isEvaluate', 'course__teacher__name',
                                                                      'course__section')

    dataCoursesEvaluate = []
    dataCoursesNotEvaluate = []
    for course in dataCourses:
        if not course['isEvaluate']:
            course['isEvaluate'] = 'Por Evaluar'
            dataCoursesNotEvaluate.append(course)
        else:
            course['isEvaluate'] = 'Evaluado'
            dataCoursesEvaluate.append(course)

    data = {}
    data['evaluate'] = list(dataCoursesEvaluate)
    data['notEvaluate'] = list(dataCoursesNotEvaluate)

    json_data = json.dumps(data, cls=DjangoJSONEncoder)

    return HttpResponse(json_data, content_type='application/json')


def unlock(request, user_id):
    user = NaturalUser.objects.get(pk=user_id)

    user.isLocked = False
    user.save()

    url = reverse('admin:{}_{}_change'.format(user._meta.app_label, user._meta.model_name),
                  args=[user.pk],
                  current_app='admin',
                  )

    return HttpResponseRedirect(url)
