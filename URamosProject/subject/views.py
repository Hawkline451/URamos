from django.contrib.auth.models import User
from django.shortcuts import render

import json
from urllib.request import urlopen

from URamosProject.teacher.models import Teacher
from subject.models import Semester, Subject, Course
# Create your views here.

# Create parser json
def parser():
    json_link = "https://ucampus.uchile.cl/b/fcfm_catalogo/cursos"
    json_data = urlopen(json_link)
    data = json.loads(json_data.read().decode())
    #print(data.keys())
    for age in data.keys():
        #print(data[age].keys())
        for semester in data[age].keys():
            sem = Semester(name = semester, year = int(age))
            sem.save()
            #print(data[age][semester].keys())
            for department in data[age][semester].keys():
                #print(data[age][semester][department].keys())
                for code in data[age][semester][department].keys():
                    name_course = data[age][semester][department][code]['nombre']
                    #print(data[age][semester][department][code]['secciones'].keys())
                    for section in data[age][semester][department][code]['secciones'].keys():
                        #print(data[age][semester][department][code]['secciones'][section]['profesores'])
                        for teacher in data[age][semester][department][code]['secciones'][section]['profesores']:
                            #print(teacher)
                            user = User.objects.create_user(username = teacher)
                            teacher = Teacher(user=user)
                            teacher.save()
                            subject = Subject(code = code, department = department, name = name_course)
                            subject.save()
                            course = Course(subject = subject, semester = sem, teacher = teacher)
                            course.save()

parser()