from django.db import models
from teacher.models import Teacher

# Create your models here.
class Class(models.Model):
	code = models.CharField(max_length=16, primary_key=True)
	department = models.CharField(max_length=64)
	name = models.CharField(max_length=256)
	note = models.FloatField(default=0)

class Semester(models.Model):
	name = models.CharField(max_length=16)
	year = models.IntegerField()

class Course(models.Model):
	_class = models.ForeignKey(Class, on_delete=models.CASCADE)
	semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
	teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)