from django.db import models
from teacher.models import Teacher

# Create your models here.
class Subject(models.Model):
	code = models.CharField(max_length=16, primary_key=True)
	department = models.CharField(max_length=64)
	name = models.CharField(max_length=256)
<<<<<<< HEAD
	noteSubject = models.FloatField(default=0)

=======
	note = models.FloatField(default=0)
	def __str__(self):
		return self.code+ " " + self.name
>>>>>>> 8f692f78115bfdf5d14b0cd3e5b6216bcaa97c0c

class Semester(models.Model):
	name = models.CharField(max_length=16)
	year = models.IntegerField()
	def __str__(self):
		return self.name+ " " + str(self.year)

class Course(models.Model):
	subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
	semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
	teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
<<<<<<< HEAD
	noteCourse = models.FloatField(default=0)
	noteTeacher = models.FloatField(default=0)
=======
	section = models.IntegerField()
	def __str__(self):
		return self.subject.name + "-" + str(self.section) + " " + str(self.semester.year)
>>>>>>> 8f692f78115bfdf5d14b0cd3e5b6216bcaa97c0c
