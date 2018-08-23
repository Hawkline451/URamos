# Create your views here.

import json

from django.http import HttpResponse
from django.utils import timezone
from log.models import Record
from moderator.models import Moderator
from naturalUser.models import NaturalUser, UserCourses
from rest_framework.decorators import api_view
from subject.models import Subject, Course
from teacher.models import Teacher

from .models import Comment, InvisibleComment, UserComments


@api_view(['POST'])
def HideComment(request):
    body = json.loads(request.body)['data']

    comment = Comment.objects.get(pk=body['comentId'])

    inv = InvisibleComment(comment=comment, reasons=body['comentario'])
    inv.save()

    mod = Moderator.objects.get(user=request.user)

    firstComment = 'Comentario bloqueado ' + timezone.now().strftime('%d/%m/%Y')
    secondComment = mod.name + ' ha bloqueado el comentario de ' + comment.user.nickname + ' en  ' + comment.course.subject.code + ' - ' + comment.course.subject.name

    newRecord = Record(firstComment=firstComment, secondComment=secondComment, typeRecord=1)
    newRecord.save()

    comment.isVisible = False
    comment.save()

    return HttpResponse({'data': 'El comentario ha sido ocultado con exito'},
                        content_type='application/json')


@api_view(['POST'])
def UpVoteComment(request):
    body = json.loads(request.body)['data']

    comment = Comment.objects.get(pk=body['commentId'])

    comment.positivePoints += 1
    comment.ranking += 1
    comment.save()

    natUser = NaturalUser.objects.get(user=request.user)

    user_comments = UserComments.objects.get (comment=comment, user=natUser)
    user_comments.isVote = True
    user_comments.save()

    return HttpResponse({},
                        content_type='application/json')


@api_view(['POST'])
def DownVoteComment(request):
    body = json.loads(request.body)['data']

    comment = Comment.objects.get(pk=body['commentId'])

    comment.negativePoints += 1
    comment.ranking -= 1
    comment.save()

    natUser = NaturalUser.objects.get(user=request.user)

    user_comments = UserComments.objects.get (comment=comment, user=natUser)
    user_comments.isVote = True
    user_comments.save()

    return HttpResponse({},
                        content_type='application/json')


@api_view(['POST'])
def SaveComment(request):
    body = json.loads(request.body)['data']

    notaCurso = (body['notaValoracion'] + body['notaExigencia'] + body['notaAsistencia']) / 3
    notaProfesor = (body['notaBuenDocente'] + body['notaCompromiso'] + body['notaAsistencia']) / 3

    notaTotal = (notaCurso + notaProfesor) / 2

    comentario = body['comentario']

    codigo = body['code']
    teacher = body['teacher']
    year = body['anno']
    semestre = body['semester']
    seccion = body['section']

    subject = Subject.objects.get(pk=codigo)
    profesor = Teacher.objects.get(name__contains=teacher)
    course = Course.objects.get(subject=subject, semester__year=year, semester__name=semestre,
                                   section=seccion, teacher=profesor)

    subject.noteSubject = (subject.noteSubject * subject.votes + notaCurso) / (subject.votes + 1)
    subject.votes += 1
    subject.save()

    profesor.note = (profesor.note * profesor.votes + notaProfesor) / (profesor.votes + 1)
    profesor.votes += 1
    profesor.save()

    course.noteCourse = (course.noteCourse * course.votes + notaTotal) / (course.votes + 1)
    course.noteTeacher = (course.noteTeacher * course.votes + notaProfesor) / (course.votes + 1)
    course.votes += 1
    course.save()

    naturalUser = NaturalUser.objects.get(user=request.user)

    comment = Comment(content=comentario, user=naturalUser, noteTeacher=notaProfesor, noteCourse=notaCurso,
                      course=course)
    comment.save()

    firstComment = 'Nuevo comentario ' + timezone.now().strftime('%d/%m/%Y')
    secondComment = 'Usuario ' + naturalUser.nickname + ' realizó un nuevo comentario en ' + subject.code + ' - ' + subject.name

    newRecord = Record(firstComment=firstComment, secondComment=secondComment, typeRecord=0)

    newRecord.save()

    userCourse = UserCourses.objects.get(user=naturalUser, course=course)
    userCourse.isEvaluate = True
    userCourse.save()

    users = NaturalUser.objects.all()
    for user in users:
        user_comments = UserComments(comment=comment, user=user)
        if user == request.user:
            user_comments.isVote = True
        user_comments.save()

    return HttpResponse({'data': 'Su evaluacion ha sido procesada con exito <br/><br/> Gracias!'},
                        content_type='application/json')
