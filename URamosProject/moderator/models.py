from django.db import models
from django.contrib.auth.models import User

from subject.models import Subject
from naturalUser.models import NaturalUser


# Create your models here.

class Moderator(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
	name = models.CharField(max_length=64)
	def __str__(self):
		return self.name

class ModeratorSubjects(models.Model):
	subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
	moderator = models.ForeignKey(Moderator, on_delete=models.CASCADE)
	def __str__(self):
		return self.moderator.name

class UserList(models.Model):
	user = models.ForeignKey(NaturalUser, on_delete=models.CASCADE)
	moderator = models.ForeignKey(Moderator, on_delete=models.CASCADE)
	def __str__(self):
		return self.moderator.name