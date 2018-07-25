from django.db import models
from teacher.models import Teacher

# Create your models here.
class Subject(models.Model):
	code = models.CharField(max_length=16, primary_key=True)
	department = models.CharField(max_length=64)
	name = models.CharField(max_length=256)
	note = models.FloatField(default=0)
	def __str__(self):
		return self.code+ " " + self.name

class Semester(models.Model):
	name = models.CharField(max_length=16)
	year = models.IntegerField()
	def __str__(self):
		return self.name+ " " + str(self.year)

class Course(models.Model):
	subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
	semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
	teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
	section = models.IntegerField()
	def __str__(self):
		return self.subject.name + "-" + str(self.section) + " " + str(self.semester.year)