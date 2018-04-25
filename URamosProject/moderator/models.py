from django.db import models
from django.contrib.auth.models import User

from subject.models import Subject


# Create your models here.

class Moderator(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
	name = models.CharField(max_length=64)

class ModeratorSubjects(models.Model):
	subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
	moderator = models.ForeignKey(Moderator, on_delete=models.CASCADE)

