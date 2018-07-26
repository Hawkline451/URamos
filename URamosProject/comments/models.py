from django.db import models
from django.utils import timezone

from naturalUser.models import NaturalUser
from subject.models import Course


class Comment(models.Model):
	content = models.TextField(max_length=1024)
	user =  models.ForeignKey(NaturalUser, on_delete=models.CASCADE)
	date = models.DateField(default=timezone.now)
	isVisible = models.BooleanField(default=True)
	positivePoints = models.IntegerField(default=0)
	negativePoints = models.IntegerField(default=0)
	isEdited = models.BooleanField(default=False)
<<<<<<< HEAD
	noteTeacher = models.IntegerField(default=0)
	noteCourse = models.IntegerField(default=0)
	course = models.ForeignKey(Course, on_delete=models.CASCADE)
=======
	def __str__(self):
		return self.user.name
>>>>>>> 8f692f78115bfdf5d14b0cd3e5b6216bcaa97c0c

class InvisibleComment(models.Model):
	comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
	reasons = models.TextField(max_length=1024)
	date = models.DateField(default=timezone.now)
	def __str__(self):
		return self.comment.user.name

class OldComment(models.Model):
	content = models.TextField(max_length=1024)
	date = models.DateField()

class EditedList(models.Model):
	comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
	old_content = models.ForeignKey(OldComment, on_delete=models.CASCADE)
