from django.db import models
from django.utils import timezone

from naturalUser.models import NaturalUser


class Comment(models.Model):
	content = models.TextField(max_length=1024)
	user =  models.ForeignKey(NaturalUser, on_delete=models.CASCADE)
	date = models.DateField(default=timezone.now)
	isVisible = models.BooleanField(default=True)
	positivePoints = models.IntegerField(default=0)
	negativePoints = models.IntegerField(default=0)
	isEdited = models.BooleanField(default=False)

class InvisibleComment(models.Model):
	comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
	reasons = models.TextField(max_length=1024)
	date = models.DateField(default=timezone.now)

class OldComment(models.Model):
	content = models.TextField(max_length=1024)
	date = models.DateField()

class EditedList(models.Model):
	comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
	old_content = models.ForeignKey(OldComment, on_delete=models.CASCADE)
