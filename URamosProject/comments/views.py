from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.views import View
from django.db.models import Count
from teacher.models import Teacher
from subject.models import Subject, Course
from naturalUser.models import NaturalUser
from rest_framework.decorators import api_view
from .models import Comment
import json

@api_view(['POST'])
def SaveComment (request) :
    body = json.loads (request.body) ['data']

    notaCurso = (body ['notaValoracion'] + body ['notaExigencia'] + body ['notaAsistencia']) / 3
    notaProfesor = (body ['notaBuenDocente'] + body ['notaCompromiso'] + body ['notaAsistencia']) / 3

    notaTotal = (notaCurso + notaProfesor) / 2

    comentario = body ['comentario']

    codigo = body ['code']
    teacher = body ['teacher']
    year = body ['anno']
    semetre = body ['semestre']
    seccion = body ['section']

    subject = Subject.objects.get (pk=codigo)
    profesor = Teacher.objects.get (name__contains=teacher)
    course = Course.objects.get (subject=subject, semester__year=year, semester__name__contains=semetre,
                                 section=seccion, teacher=profesor)

    subject.noteSubject = (subject.noteSubject * subject.votes + notaCurso) / (subject.votes + 1)
    subject.votes += 1
    subject.save ()

    profesor.note = (profesor.note * profesor.votes + notaProfesor) / (profesor.votes + 1)
    profesor.votes += 1
    profesor.save ()

    course.noteCourse = (course.noteCourse * course.votes + notaTotal) / (course.votes + 1)
    course.noteTeacher = (course.noteTeacher * course.votes + notaProfesor) / (course.votes + 1)
    course.votes += 1
    course.save ()

    naturalUser = NaturalUser.objects.get(user=request.user)

    comment = Comment (content=comentario, user=naturalUser, noteTeacher=notaProfesor, noteCourse=notaCurso,
                       course=course)
    comment.save()

    return HttpResponse({'data':'Done'}, content_type='application/json')
