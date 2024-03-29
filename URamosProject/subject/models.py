from django.db import models
from teacher.models import Teacher

# name = models.CharField(max_length=256, primary_key=True)

# TODOS LOS COURSES QUE TENGA A ESE PROFE (name) Y AL SUBJECT (subject).

class Subject(models.Model):
	code = models.CharField(max_length=16, primary_key=True)
	department = models.CharField(max_length=64)
	name = models.CharField(max_length=256)
	votes = models.IntegerField(default=0, verbose_name='Votos')
	noteSubject = models.FloatField(default=0, verbose_name='Nota Curso')
	note = models.FloatField(default=0)
	def __str__(self):
		return self.code+ " - " + self.name

class Semester(models.Model):
	name = models.CharField(max_length=16, verbose_name='Nombre')
	year = models.IntegerField(verbose_name='Año')
	def __str__(self):
		return self.name+ " " + str(self.year)

class Course(models.Model):
	subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
	semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
	teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, verbose_name='Profesor')
	votes = models.IntegerField (default=0, verbose_name='Votos')
	noteCourse = models.FloatField(default=0, verbose_name='Nota curso')
	noteTeacher = models.FloatField(default=0, verbose_name='Nota Profesor')
	section = models.IntegerField(verbose_name='sección')
	def __str__(self):
		return self.subject.name + "-" + str(self.section) + " " + str(self.semester.year)

